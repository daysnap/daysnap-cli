import { createRoute } from '@/core'
import {
  askConfirmAndTemplate,
  getReposList,
  getTemplateRepo,
  parseName,
  parseUrl,
  generate,
} from './utils'
import { spinner } from '@/utils'
import { Config } from './config'

export default createRoute(async (ctx) => {
  spinner.start(`正在检测环境...`)
  const { configServer, args, options } = ctx
  const [rowName] = args
  const { name, output, inPlace } = parseName(rowName)
  const config = Object.assign(
    await configServer.get<Config>('create'),
    options,
  )
  const { depositUrl, repoUrl } = parseUrl(config)
  let templates = []
  if (!config.template) {
    templates = await getReposList(depositUrl)
  }
  spinner.succeed(`检测环境完成！`)
  const { ok = true, template = config.template } = await askConfirmAndTemplate(
    {
      templates,
      inPlace,
    },
  )
  if (!ok) {
    return process.exit(1)
  }

  spinner.start(`正在拉取模板...`)
  const src = await getTemplateRepo({
    template,
    repoUrl,
    cache: config.cache,
  })
  spinner.succeed(`拉取模板完成！`)

  console.log(3, ok, template, src)

  spinner.start(`正在创建项目...`)
  await generate({
    src,
    name,
    output,
  })
  spinner.succeed(`创建项目完成！${name} : ${output}`)
})

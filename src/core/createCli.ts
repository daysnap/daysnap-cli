import { ParseOptions, program } from 'commander'
import minimist from 'minimist'
import { Cli, Context } from '@/types'
import { requireContext } from './requireContext'
import { prefix } from './prefix'
import { suffix } from './suffix'

export function createCli(argv: string[], options?: ParseOptions): Cli {
  const bootstrap: Cli['bootstrap'] = (dirname) => {
    use(prefix)

    const rc = requireContext(dirname, /\.js$/)
    rc.keys()
      // .filter((k) => !k.includes(`${dirname}/index.js`))
      .map((k) => rc(k).default)
      .filter((item) => item && item.install)
      .sort((x, y) => x.sort - y.sort)
      .forEach(use)

    use(suffix)

    program.parse(argv, options)
  }

  const use: Cli['use'] = (plugin, ...options) => {
    plugin.install(context, ...options)
    return cli
  }

  const context: Context = {
    program,
    argv,
    parseArgv: () => minimist(argv.slice(2)),
    args: [],
  }

  const cli = { use, context, options, bootstrap }

  return cli
}

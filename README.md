# Topics

## Basic Topics (Small Apps)

- [ ] 00 - Intro
 - speackers
- [x] 01 - Basic Angular What is that
- [x] 02 - TypeScript & JS
- [X] 03 - Setup Node.js & NX & Angular @hirsch88
  - file structure
- [X] 04 - Design System @hirsch88
- [x] 05 - Components @yannickholzenkamp
  - [X] templates
  - [X] input / output bindings
  - [x] control flows
  - [x] pipes
  - [x] lifecyle
  - [x] architecure / nested
  - [x] rework tasks
  - [x] ( careful use function and getters )
  - [x] ( use trackBy )
  - [x] ( standalone )
- [ ] 06 - Routing
- [x] 07 - DI / Inject-based dependency injection @hirsch88 
- [x] 07 - service @hirsch88 
- [ ] 08 - module / standalone 
- [x] 10 - Change Detection Light @hirsch88 
- [ ] 11 - observables @hirsch88
- [ ] 12 - signals  @hirsch88
- [ ] 13 - Ajax Requests
- [ ] 14 - Debugging

## Intermediate

- [] Routing
 - lazy loading
 - parameters from route
- [] Forms
 - layout
 - validation
- [] Translations
- [] security
- [] baloise deployment (intern)

## Advanced Topics (Large Apps & External)

- Change Detection / performance / best practices
- State Mgmt
- Deferrable Views
- Shared Lib / mono repo
- architecure clean

## Test Topics

- unit testing
- e2e testing with cypress
 - component
 - e2e
 - visuals






# Slides

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)** ✨

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Just run `nx build demoapp` to build the application. The build artifacts will be stored in the `dist/` directory, ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Connect with us!

- [Join the community](https://nx.dev/community)
- [Subscribe to the Nx Youtube Channel](https://www.youtube.com/@nxdevtools)
- [Follow us on Twitter](https://twitter.com/nxdevtools)

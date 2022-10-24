export interface ServiceConfiguration {
  /** Semantic version for current build */
  VERSION: string
}

/**
 * Load a {@link ServiceConfiguration} from the global environment.
 */
export const getServiceConfig = (): ServiceConfiguration => {
  return {
    // @ts-ignore
    VERSION: PXFLUX_VERSION,
  }
}

// Shared between the layout's single MoonCanvas and the pages it sits behind.
export const moonStage = $state<{
	/** The home page's scroll container; the moon waits for it before following home scroll. */
	container?: HTMLElement;
	/** True once the first intro has finished (or failed), so later pages skip their own intro. */
	settled: boolean;
}>({ settled: false });

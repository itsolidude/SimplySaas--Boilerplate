<script lang="ts">
	import ExclamationCircle from '~icons/heroicons/exclamation-circle';

	let { message } = $props<{ message: string | null }>();
</script>

{#if message}
	<div
		class="fade-in group text-sm text-destructive/90 px-5 py-4 rounded-lg border border-destructive/30 bg-gradient-to-r from-destructive/5 via-destructive/8 to-destructive/10 shadow-md backdrop-blur-sm"
		role="alert"
	>
		<div class="flex gap-4 items-center">
			<ExclamationCircle class="h-5 w-5 shrink-0" />
			<span class="font-medium tracking-tight leading-relaxed">{message}</span>
		</div>
	</div>
{/if}

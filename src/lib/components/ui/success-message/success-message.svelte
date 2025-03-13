<script lang="ts">
	import CheckCircle from '~icons/heroicons/check-circle';

	let { message } = $props<{ message: string | null }>();
</script>

{#if message}
	<div
		class="fade-in group text-sm text-green-700/90 px-5 py-4 rounded-lg border border-green-500/30 bg-gradient-to-r from-green-500/5 via-green-500/8 to-green-500/10 shadow-md backdrop-blur-sm"
		role="alert"
	>
		<div class="flex gap-4 items-center">
			<CheckCircle class="h-5 w-5 shrink-0" />
			<span class="font-small tracking-tight leading-relaxed">{message}</span>
		</div>
	</div>
{/if}

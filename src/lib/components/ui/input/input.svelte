<script lang="ts">
	import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import IconEye from '~icons/heroicons/eye-20-solid';
	import IconEyeSlash from '~icons/heroicons/eye-slash-20-solid';
	import IconExclamationTriangle from '~icons/heroicons/exclamation-triangle-20-solid';

	type InputType = Exclude<HTMLInputTypeAttribute, 'file'>;

	type Props = WithElementRef<
		Omit<HTMLInputAttributes, 'type'> &
			({ type: 'file'; files?: FileList } | { type?: InputType; files?: undefined })
	> & {
		showPasswordToggle?: boolean;
		error?: boolean;
	};

	let {
		ref = $bindable(null),
		value = $bindable(),
		type,
		files = $bindable(),
		class: className,
		showPasswordToggle = false,
		error = false,
		...restProps
	} = $props();

	let showPassword = $state(false);

	function togglePassword() {
		showPassword = !showPassword;
	}
</script>

{#if type === 'file'}
	<input
		bind:this={ref}
		class={cn(
			'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			error && 'border-destructive',
			className
		)}
		type="file"
		bind:files
		bind:value
		{...restProps}
	/>
{:else}
	<div class="relative">
		<input
			bind:this={ref}
			class={cn(
				'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				error && 'border-destructive',
				(showPasswordToggle && type === 'password') || error ? 'pr-10' : '',
				className
			)}
			type={type === 'password' && showPassword ? 'text' : type}
			bind:value
			{...restProps}
		/>
		<div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
			{#if showPasswordToggle && type === 'password'}
				<button
					type="button"
					onclick={togglePassword}
					class="text-gray-500 hover:text-gray-700 focus:outline-none"
				>
					{#if showPassword}
						<IconEyeSlash />
					{:else}
						<IconEye />
					{/if}
				</button>
			{/if}
			{#if error}
				<div class="text-destructive">
					<IconExclamationTriangle />
				</div>
			{/if}
		</div>
	</div>
{/if}

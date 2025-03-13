<script lang="ts">
	import IconBriefcase from '~icons/heroicons/briefcase';

	type Size = 'sm' | 'md' | 'lg';
	let props = $props<{ size?: Size }>();
	const size: Size = props.size ?? 'md';

	const sizeClasses = {
		sm: 'text-lg gap-1.5',
		md: 'text-xl gap-2',
		lg: 'text-2xl gap-2.5'
	} as const;

	const iconSizeClasses = {
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6'
	} as const;
</script>

<div class="flex items-center font-bold {sizeClasses[size]}">
	<IconBriefcase class="{iconSizeClasses[size]} text-primary" />
	<span class="gradient-text">JobHunt</span>
</div>

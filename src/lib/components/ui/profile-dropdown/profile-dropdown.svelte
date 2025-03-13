<script lang="ts">
	import { User, Settings, Bell, HelpCircle, LogOut } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		DropdownMenu,
		DropdownMenuTrigger,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { goto } from '$app/navigation';

	// Using $props rune with proper type definition
	let props = $props<{
		name: string;
		email: string;
		avatarUrl?: string;
		onSignOut?: () => Promise<void>;
	}>();

	let basePath = '/private';
	let initials = $derived(
		props.name
			.split(' ')
			.map((n: string) => n[0])
			.join('')
			.toUpperCase()
	);

	function navigateTo(path: string) {
		const isPublicRoute = path === '/help';
		goto(
			isPublicRoute ? path : path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`
		);
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger class="relative h-8 w-8 p-0 hover:opacity-80">
		<Avatar class="h-full w-full border bg-background">
			{#if props.avatarUrl}
				<AvatarImage src={props.avatarUrl} alt="Profile picture" />
			{/if}
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	</DropdownMenuTrigger>

	<DropdownMenuContent class="w-56" align="end">
		<DropdownMenuLabel class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">{props.name}</p>
				<p class="text-xs leading-none text-muted-foreground">{props.email}</p>
			</div>
		</DropdownMenuLabel>

		<DropdownMenuSeparator />

		<DropdownMenuGroup>
			<DropdownMenuItem onclick={() => navigateTo('profile')}>
				<User class="mr-2 h-4 w-4" />
				<span class="w-full">Profile</span>
			</DropdownMenuItem>

			<DropdownMenuItem onclick={() => navigateTo('settings')}>
				<Settings class="mr-2 h-4 w-4" />
				<span class="w-full">Settings</span>
			</DropdownMenuItem>

			<DropdownMenuItem onclick={() => navigateTo('notifications')}>
				<Bell class="mr-2 h-4 w-4" />
				<span class="w-full">Notifications</span>
			</DropdownMenuItem>
		</DropdownMenuGroup>

		<DropdownMenuSeparator />

		<DropdownMenuItem onclick={() => navigateTo('/help')}>
			<HelpCircle class="mr-2 h-4 w-4" />
			<span>Help & Support</span>
		</DropdownMenuItem>

		<DropdownMenuSeparator />

		<DropdownMenuItem
			onclick={props.onSignOut}
			class="text-red-600 focus:text-red-600 focus:bg-red-100"
		>
			<LogOut class="mr-2 h-4 w-4" />
			<span>Log out</span>
		</DropdownMenuItem>
	</DropdownMenuContent>
</DropdownMenu>

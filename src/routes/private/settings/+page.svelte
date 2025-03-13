<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import type { PageData } from './$types';

	let { data } = $props<{ data: PageData }>();
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold tracking-tight">Settings</h1>
		<p class="text-muted-foreground">View your account settings</p>
	</div>

	<Card>
		<CardHeader>
			<CardTitle>Account Information</CardTitle>
			<CardDescription>Your current account details</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="space-y-2">
				<p><span class="font-semibold">Email:</span> {data.user?.email}</p>
			</div>
		</CardContent>
	</Card>
</div>

<script lang="ts">
	let { data } = $props();
	let { user } = $derived(data);
</script>

<div class="bg-white shadow rounded-lg p-6">
	<h1 class="text-2xl font-semibold text-gray-900 mb-6">
		Welcome back{user?.email ? `, ${user.email}` : ''}!
	</h1>

	<div class="prose max-w-none">
		<p>
			This is a protected page that can only be accessed by authenticated users. You can modify this
			page to show user-specific content or add more sections to your dashboard.
		</p>
	</div>
</div>

<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
	<div class="bg-white shadow rounded-lg p-6">
		<h2 class="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
		<p class="text-gray-600">Add your dashboard widgets here</p>
	</div>

	<div class="bg-white shadow rounded-lg p-6">
		<h2 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
		<p class="text-gray-600">Display user activity here</p>
	</div>

	<div class="bg-white shadow rounded-lg p-6">
		<h2 class="text-lg font-medium text-gray-900 mb-4">Notifications</h2>
		<p class="text-gray-600">Show user notifications here</p>
	</div>
</div>

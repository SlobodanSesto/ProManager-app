<template>
	<f7-navbar no-shadow  top :sliding="false" no-hairline>
		<f7-nav-left v-if="_backButton" back-link></f7-nav-left>
		<f7-nav-title sliding>{{ _title }}</f7-nav-title>
		<f7-nav-right v-if="_burger">
			<f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-open="right"></f7-link>
		</f7-nav-right>
	</f7-navbar>
</template>

<script>
export default {
	props: [
		'_title',
		'_backButton',
		'_burger'
	],
}
</script>

<style>
	.md .navbar-inner {
		background: var(--theme-bg-color) ;
	}

	.navbar-bg::before {
		content: none;
	}
</style>

<style scoped>
	.navbar .title {
		color: var(--f7-theme-color);
		font-family: 'Saira', sans-serif;
		font-weight: medium;
		font-size: 20px;
	}
</style>
/* eslint-disable no-undef */
import * as esbuild from 'esbuild';

/** @type {esbuild.BuildOptions} */
const config = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	target: 'esnext',
	outdir: 'dist',
	sourcemap: false,
	minify: true,
	format: 'esm',
	conditions: ['worker', 'browser'],
	outExtension: { '.js': '.mjs' },
};

if (process.argv.includes('--watch')) {
	const ctx = await esbuild.context(config);
	await ctx.watch();
	console.log('Watching for changes...');
} else {
	await esbuild.build(config);
}

import * as babel from 'babel-core';
import PluginLogger from 'liferay-npm-build-tools-common/lib/plugin-logger';
import plugin from '../index';

let logger;

beforeEach(() => {
	PluginLogger.set(__filename, (logger = new PluginLogger()));
});

it('logs results correctly', () => {
	const source = `
	define([], function(){})
	`;

	babel.transform(source, {
		filenameRelative: __filename,
		plugins: [plugin],
	});

	expect(logger.messages).toMatchSnapshot();
});

it('correctly names anonymous modules', () => {
	const source = `
	define([], function(){})
	`;

	const {code} = babel.transform(source, {
		filenameRelative: __filename,
		plugins: [plugin],
	});

	expect(code).toMatchSnapshot();
});

it('correctly renames named modules', () => {
	const source = `
	define('my-invalid-name', [], function(){})
	`;

	const {code} = babel.transform(source, {
		filenameRelative: __filename,
		plugins: [plugin],
	});

	expect(code).toMatchSnapshot();
});

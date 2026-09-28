import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import worker from "../src/index";

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe("Practica 4 worker", () => {
	it("responds with the updated message (unit style)", async () => {
		const request = new IncomingRequest("http://example.com");

		const ctx = createExecutionContext();

		const response = await worker.fetch(request, env, ctx);

		await waitOnExecutionContext(ctx);

		expect(await response.text()).toMatchInlineSnapshot(
			`"Hello World! Practica 4 - Ikram"`,
		);
	});

	it("responds with the updated message (integration style)", async () => {
		const response = await SELF.fetch("https://example.com");

		expect(await response.text()).toMatchInlineSnapshot(
			`"Hello World! Practica 4 - Ikram"`,
		);
	});
});
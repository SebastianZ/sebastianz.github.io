import React from 'react'
import { Slide, Code } from '@revealjs/react'

const Slides = () => (
	<>
		<Slide>
			<div class="center-contents">
				<h1>Boost your app's performance using threads</h1>
				<h3>Threading and parallelization in Lucee / CFML</h3>
			</div>
		</Slide>

		<Slide>
			<h2>Who am I?</h2>
			<ul>
				<li>Name: Sebastian Zartner</li>
				<li>Company: <a href="https://de.webedia-group.com/">Webedia GmbH</a></li>
				<li>Contributions: Former <a href="https://github.com/firebug/firebug/graphs/contributors">Firebug contributor</a>, Firefox contributor, <a href="https://www.w3.org/groups/wg/css/participants/">invited expert of CSS Working Group</a></li>
				<li>Trivia: <a href="http://web.archive.org/web/20131113062800/http://www.cfcamp.org/sessions.cfm#art270759">First time CFCamp speaker in 2013</a>, proud father of a smart, little daugther</li>
				<li>Contact info: <a href="mailto:sebastianzartner@gmail.com">sebastianzartner@gmail.com</a></li>
			</ul>
		</Slide>

		<Slide>
			<h2>Why use threads?</h2>
			<ul>
				<li>Perform multiple independent tasks concurrently</li>
				<li>Offload long-running or blocking work</li>
				<li>Keep user-facing requests responsive</li>
			</ul>
		</Slide>

		<Slide>
			<h2>High-Level APIs</h2>
			<ul>
				<li>Collection parallel processing</li>
				<li>Function Listeners</li>
				<li><code>runAsync()</code> and Futures</li>
			</ul>
		</Slide>

		<Slide>
			<h2>Collection parallel processing</h2>
			<p>Supported in:</p>
			<ul>
				<li><code>.each()</code> - Executes code for every element</li>
				<li><code>.every()</code> - Checks if all elements meet a condition</li>
				<li><code>.filter()</code> - Creates a new collection with elements that meet a condition</li>
				<li><code>.map()</code> - Creates a new collection by transforming each element</li>
				<li><code>.some()</code> - Checks if any element meets a condition</li>
			</ul>
		</Slide>

		<Slide>
			<h2>Parallel array processing</h2>
			<Code language="cfml" trim lineNumbers="1-13|10|11">{`
				array = ["item1", "item2", "item3", "item4", "item5"];

				start = getTickCount();
				arrayEach(
					array=array,
					closure=(item) => {
						sleep(1000);
						writeOutput("#item# #now()#<br>");
					},
					parallel=true,
					maxThreads=3
				);
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Parallel struct processing</h2>
			<Code language="cfml" trim lineNumbers="1-18|15-16">{`
				struct = {
					key1: "Alice",
					key2: "Bob",
					key3: "Charlie",
					key4: "Diana"
				};

				start = getTickCount();
				structEach(
					struct=struct,
					closure=(value, key) => {
						sleep(1000);
						writeOutput("#key#: #value# #now()#<br>");
					},
					parallel=true,
					maxThreads=3
				);
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Parallel query processing</h2>
			<Code language="cfml" trim lineNumbers="1-18|15-16">{`
				query = queryNew("id,name", "integer,varchar", [
					{id: 1, name: "Alice"},
					{id: 2, name: "Bob"},
					{id: 3, name: "Charlie"},
					{id: 4, name: "Diana"}
				]);

				start = getTickCount();
				queryEach(
					query=query,
					closure=(row) => {
						sleep(1000);
						writeOutput("#row.name# (ID: #row.id#) #now()#<br>");
					},
					parallel=true,
					maxThreads=3
				);
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Parallel list processing</h2>
			<Code language="cfml" trim lineNumbers="1-13|10-11">{`
				list = "item1,item2,item3,item4,item5";

				start = getTickCount();
				listEach(
					list=list,
					closure=(item) => {
						sleep(1000);
						writeOutput("#item# #now()#<br>");
					},
					parallel=true,
					maxThreads=3
				);
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Function Listeners</h2>
			<p>Modern promise-like syntax for async execution.</p>
			<Code language="cfml" trim lineNumbers="1-10|7-9">{`
				function fetchUserData(userId) {
					sleep(5000);
					return {"id": userId, "name": "User #userId#"};
				}

				start = getTickCount();
				fetchUserData(123):function(result, error) {
					fileWrite("./user_data.txt", serializeJson(result));
				};
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Joining Function Listeners</h2>
			<Code language="cfml" trim lineNumbers="1-16|14">{`
				function fetchUserData(userId) {
					sleep(1000);
					return {"id": userId, "name": "User #userId#"};
				}

				start = getTickCount();
				for (i = 1; i <= 5; i++) {
					userId = randRange(1, 100);
					fetchUserData(userId):(result, error) => {
						thread.userData = result;
					}
				}

				threadJoin(timeout=10000);
				writeDump(cfthread);
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Error handling with Function Listeners</h2>
			<Code language="cfml" trim lineNumbers="1-18|10-17">{`
				function randomFailure() {
					sleep(1000);
					if (randRange(1, 2) == 1) {
						throw "Error!";
					}
					return "Success!";
				}

				start = getTickCount();
				randomFailure():{
					onSuccess: (result) => {
						systemOutput("Succeeded: #result#", true);
					},
					onFail: (error) => {
						systemOutput("Failed: #error.message#", true);
					}
				};
				writeDump("Processing completed in #getTickCount() - start# ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Basic thread blocks</h2>
			<Code language="cfml" trim lineNumbers="1-10|2-4">{`
				function logData(data) {
					thread {
						sleep(1000);
						systemOutput("Logged: #data#", true);
					}
				}
				logData("Important info");
				logData("More info");
				logData("Even more info");
				writeDump("Function called asynchronously");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Thread management</h2>
			<Code language="cfml" trim lineNumbers="1-17|2-4|12|15">{`
				function fetchData(name) {
					thread name="#name#" {
						thread action="sleep" duration=1000;
					}
				}

				start = getTickCount();
				fetchData("x");
				fetchData("y");
				fetchData("z");

				thread action="terminate" name="x";
				sleep(500);
				writeDump(var=cfthread, label="Threads statuses before joining");
				thread action="join" name="#cfthread.keyList()#";
				writeDump(var=cfthread, label="All threads completed");
				writeDump("Total execution time: #getTickCount()-start#ms");
			`}</Code>
		</Slide>

		<Slide>
			<h2>Passing variables to and from threads</h2>
			<Code language="cfml" trim lineNumbers="1-16|2,4|5-6">{`
				function fetchData(name, delay) {
					thread name="#name#" delay="#delay#" {
						var start = getTickCount();
						sleep(attributes.delay);
						thread.data = "Data from #thread.name#";
						thread.duration = getTickCount() - start;
					}
				}

				start = getTickCount();
				fetchData("x", 1000);
				fetchData("y", 3000);
				fetchData("z", 2000);
				thread action="join" name=cfthread.keyList();
				writeDump(var=cfthread, label="All threads completed");
				writeDump("Total execution time: #getTickCount()-start#ms");
			`}</Code>
		</Slide>

		<Slide autoAnimate>
			<h2>Shared data</h2>
			<Code language="cfml" id="shared-data" trim lineNumbers="1-12|7">{`
				request.counter = 0;

				start = getTickCount();
				for (i = 1; i <= 20; i++) {
					thread {
						sleep(1000);
						request.counter++;
					}
				}
				threadJoin();
				writeDump(var=request.counter, label="All threads completed");
				writeDump("Total execution time: #getTickCount()-start#ms");
			`}</Code>
		</Slide>

		<Slide autoAnimate>
			<h2>Task threads</h2>
			<Code language="cfml" id="task-threads" trim lineNumbers="1-12|5">{`
				request.counter = 0;

				start = getTickCount();
				for (i = 1; i <= 20; i++) {
					thread type="task" {
						sleep(1000);
						request.counter++;
					}
				}
				threadJoin();
				writeDump(var=request.counter, label="All threads completed");
				writeDump("Total execution time: #getTickCount()-start#ms");
			`}</Code>
		</Slide>

		<Slide autoAnimate>
			<h2>Shared data</h2>
			<Code language="cfml" id="shared-data" trim lineNumbers="7-9">{`
				request.counter = 0;

				start = getTickCount();
				for (i = 1; i <= 20; i++) {
					thread {
						sleep(1000);
						lock scope="request" {
							request.counter++;
						}
				}
				threadJoin();
				writeDump(var=request.counter, label="All threads completed");
				writeDump("Total execution time: #getTickCount()-start#ms");
			`}</Code>
		</Slide>

		<Slide autoAnimate>
			<h2><code>runAsync()</code> and futures</h2>
			<pre><code className="language-cfml" id="runasync" trim lineNumbers="1-13|3-6|11">{`
				runs = 10;
				for (i = 1; i <= runs; i++) {
					request["future#i#"] = runAsync(() => {
						sleep(1000);
						return randRange(1, 100);
					});
				}

				start = getTickCount();
				for (i = 1; i <= runs; i++) {
					writeDump(request["future#i#"].get());
				}
				writeDump("Total execution time: #getTickCount()-start#ms");
			`}</code></pre>
		</Slide>

		<Slide>
			<h2>Best Practices</h2>
			<ul>
				<li>Prefer high-level APIs when possible</li>
				<li>Limit number of concurrent threads to CPU and I/O characteristics</li>
				<li>Measure and profile - threads can make things worse if misused</li>
				<li>Ensure thread-safety of shared resources</li>
			</ul>
		</Slide>

		<Slide>
			<h2>Limitations &amp; caveats</h2>
			<ul>
				<li>Thread lifecycle and server resource limits</li>
				<li>Session scope is not thread-safe by default</li>
				<li>Database connection pools can be exhausted</li>
				<li>Over-threading can increase contention and GC pressure</li>
			</ul>
		</Slide>

		<Slide>
			<h2>Further Reading</h2>
			<ul>
				<li><a href="https://docs.lucee.org/recipes/thread-usage.html">Complete Guide to Threading in Lucee</a></li>
				<li><a href="https://modern-cfml.ortusbooks.com/cfml-language/threading">Article about <code>&lt;cfthread&gt;</code> from Ortus</a></li>
				<li><a href="https://modern-cfml.ortusbooks.com/beyond-the-100/asynchronous-programming">Article about <code>runAsync()</code> from Ortus</a></li>
				<li><a href="https://guides.adobe.com/coldfusion/en/docs/cfml-reference/__references__/using-coldfusion-threads.html">Guides about threads in ColdFusion from Adobe</a></li>
			</ul>
		</Slide>

		<Slide>
			<div class="center-contents">
				<h2>Thank you</h2>
				<p>Any questions?</p>
			</div>
		</Slide>
	</>
)

export default Slides

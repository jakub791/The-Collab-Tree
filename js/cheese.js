addLayer("cheese", {
	name: "cheese",
	symbol: "C",
	position: 1,
	startData() {
		return {
			unlocked: true,
			points: Decimal.dZero,
			goodCheese: Decimal.dZero,
			cycle: Decimal.dZero,
			activity: Decimal.dZero,
			bruh: Decimal.dZero,
			bruh2: Decimal.dZero,
			hunger: new Decimal(5),
			unlocked2: false,
			blessings: Decimal.dZero,
			goodBlessings: Decimal.dZero,
			currentState: 0,
			laeceaSacrifice: Decimal.dZero,
			laeceaPoints: Decimal.dZero,
		};
	},
	state: [
		["Neutral", "(No buffs or nerfs are applied)"],
		["Intrigued", "(x1.1 🧀 gain)"],
		["Entertained", "(^1.1 🧀 gain)"],
		["Hunger", "(x0.25 🧀 gain)"],
		["Satisfaction", "(x1.75 🧀 gain and ???)"],
		["Boredom", "(x0.8 🧀 gain)"],
		["Annoyance", "(x0.5 point and 🧀 gain)"],
		["metal pipe", "(x0 🧀 gain)"],
		[
			"Entertained...?",
			"(^0.85 🧀 gain and you can't sacrifice for one minute)",
		],
	],
	color: "rgb(255,217,131)",
	requires: Decimal.dTen,
	resource: "🧀",
	type: "none",
	bars: {
		feedMe: {
			direction: RIGHT,
			width: 375,
			height: 100,
			progress() {
				return player.cheese.hunger.div(Decimal.dTen);
			},
			display() {
				return `<h2>Hunger Meter:
                <br>${formatWhole(player.cheese.hunger)} / 5<h2/>`;
			},
			fillStyle: {
				backgroundColor: "brown",
			},
		},
	},
	upgrades: {
		a0: {
			fullDisplay: `<h3>Downfall</h3>
                    <br><span>x4 🧀 gain
                    <br><br>Cost: 1 blessing`,
			tooltip:
				"It's best if you do not buy this upgrade, god who knows what might happen next.",
			cost: Decimal.dOne,
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
		},
		b0: {
			fullDisplay() {
				return `<h3>Self-Irony</h3>
                <br><span>Blessings boost 🧀 gain by x${format(this.effect())}
                <br><br>Cost: ${formatWhole(this.cost())} blessings`;
			},
			tooltip:
				"I told you to not buy this!... Oh well, might as well go full-on zaburple mode",
			effect() {
				return player.cheese.blessings
					.add(Decimal.dOne)
					.log(777)
					.add(Decimal.dOne);
			},
			cost() {
				return new Decimal(hasUpgrade("cheese", "b1") ? 30 : 10);
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			unlocked() {
				return hasUpgrade("cheese", "a0");
			},
			branches: [["a0", "rgb(255,217,131)"]],
		},
		b1: {
			fullDisplay() {
				return `<h3>Permabooster</h3>
                <br><span>You can sacrifice your blessings for additional 🧀 gain boost
                <br><br>Cost: ${formatWhole(this.cost())} blessings`;
			},
			tooltip:
				"I heard your sacrifices are pretty strong. Let me fight them.",
			cost() {
				return new Decimal(hasUpgrade("cheese", "b0") ? 30 : 10);
			},
			canAfford() {
				return player.cheese.blessings.gte(this.cost());
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			onPurchase() {
				player.cheese.upgrades.push("b1");
			},
			unlocked() {
				return hasUpgrade("cheese", "a0");
			},
			branches: [["a0", "rgb(255,217,131)"]],
		},
		b2: {
			fullDisplay() {
				return `<h3>The Cursed Seed</h3>
                <br><span>Unlocks... something
                <br>and x4 🧀 gain
                <br><br>Cost: 20.23 Qi 🧀`;
			},
			tooltip: `<span style='color: #006080;'>Hewwo!! Did you really think I'd leave you alone with this party pooper? UwU
                <br>(i was obligated to say this please kill me)`,
			cost: new Decimal("2.023e19"),
			unlocked() {
				return hasUpgrade("cheese", "c1");
			},
			branches: [["c1", "#006080"]],
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		c0: {
			fullDisplay() {
				return `<h3>God Forsaken Feedback</h3>
                <br><span>🧀 boost blessing gain by x${format(
					this.effect(),
				)}<br><br>Cost: ${formatWhole(this.cost())} blessings`;
			},
			tooltip: "why would you do this to me bruh",
			effect() {
				return player.cheese.points.root(10).add(1).log(10).add(1);
			},
			cost() {
				return new Decimal(hasUpgrade("cheese", "c2") ? 100 : 60);
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			unlocked() {
				return hasUpgrade("cheese", "b0");
			},
			branches: [["b0", "rgb(255,217,131)"]],
		},
		c1: {
			fullDisplay() {
				return `<h3>Triangular Systematics</h3>
                <br><span>Unlocks 2 🧀 buyables
                <h5>(Cheesy Synchronization doesn't affect these buyables)</h5>
                <br>Cost: 2,020 blessings`;
			},
			tooltip:
				"Shouldn't inflate above 1e20... or 10 Qi... or whatever cursed notation you're using.",
			effect() {
				return player.cheese.blessings.add(1).log(777).add(1);
			},
			cost() {
				return new Decimal(2020);
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			unlocked() {
				return hasUpgrade("cheese", "c0") && hasUpgrade("cheese", "c2");
			},
			branches: [
				["c0", "rgb(255,217,131)"],
				["c2", "rgb(255,217,131)"],
			],
		},
		c2: {
			fullDisplay() {
				return `<h3>Cheesy Synchronization</h3>
                <br><span>Sacrificed blessings affect 🧀 buildings as well
                <br><br>Cost: ${formatWhole(this.cost())} blessings`;
			},
			tooltip: "An approriate name for such silly upgrade.",
			effect() {
				return player.cheese.blessings.add(1).log(777).add(1);
			},
			cost() {
				return new Decimal(hasUpgrade("cheese", "c0") ? 100 : 60);
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			onPurchase() {
				player.cheese.upgrades.push("c2");
			},
			unlocked() {
				return hasUpgrade("cheese", "b1");
			},
			branches: [["b1", "rgb(255,217,131)"]],
		},
		d0: {
			fullDisplay() {
				return `
        <h3>The Final Push</h3>
        <br><span>Unlocks 6th 🧀 and final buyable<br><br>Cost: ${format(
			this.cost(),
		)} blessings
        `;
			},
			tooltip:
				"Aaaaaaaand you just ruined a perfectly structured pyramid.<br><br>Good job.",
			effect() {
				return player.cheese.blessings.add(1).log(777).add(1);
			},
			cost() {
				return new Decimal(hasUpgrade("cheese", "d1") ? "1e10" : "1e9");
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			onPurchase() {
				player.cheese.upgrades.push("d0");
			},
			unlocked() {
				return hasUpgrade("cheese", "ab20");
			},
			branches: [["c1", "rgb(255,217,131)"]],
		},
		d1: {
			fullDisplay() {
				return `
        <h3>Long-Term Consequences</h3>
        <br><span>Boosts 🧀 gain by +5% per 🐀<br><br>Cost: ${format(
			this.cost(),
		)} blessings
        `;
			},
			tooltip: `<h5 style='font-size: 3px;'>According to all known laws<br>of aviation,<br><br>there is no way a bee<br>should be able to fly.<br><br>Its wings are too small to get<br>its fat little body off the ground.<br><br>The bee, of course, flies anyway<br><br>because bees don't care<br>what humans think is impossible.<br><br>Yellow, black. Yellow, black.<br>Yellow, black. Yellow, black.<br><br>Ooh, black and yellow!<br>Let's shake it up a little.<br><br>Barry! Breakfast is ready!<br><br>Ooming!<br><br>Hang on a second.<br><br>Hello?<br><br>- Barry?<br>- Adam?<br><br>- Oan you believe this is happening?<br>- I can't. I'll pick you up.<br><br>Looking sharp.<br><br>Use the stairs. Your father<br>paid good money for those.<br><br>Sorry. I'm excited.<br><br>Here's the graduate.<br>We're very proud of you, son.<br><br>A perfect report card, all B's.<br><br>Very proud.<br><br>Ma! I got a thing going here.<br><br>- You got lint on your fuzz.<br>- Ow! That's me!<br><br>- Wave to us! We'll be in row 118,000.<br>- Bye!<br><br>Barry, I told you,<br>stop flying in the house!<br><br>- Hey, Adam.<br>- Hey, Barry.<br><br>- Is that fuzz gel?<br>- A little. Special day, graduation.<br><br>Never thought I'd make it.<br><br>Three days grade school,<br>three days high school.<br><br>Those were awkward.<br><br>Three days college. I'm glad I took<br>a day and hitchhiked around the hive.<br><br>You did come back different.<br><br>- Hi, Barry.<br>- Artie, growing a mustache? Looks good.<br><br>- Hear about Frankie?<br>- Yeah.<br><br>- You going to the funeral?<br>- No, I'm not going.<br><br>Everybody knows,<br>sting someone, you die.<br><br>Don't waste it on a squirrel.<br>Such a hothead.<br><br>I guess he could have<br>just gotten out of the way.<br><br>I love this incorporating<br>an amusement park into our day.<br><br>That's why we don't need vacations.<br><br>Boy, quite a bit of pomp...<br>under the circumstances.<br><br>- Well, Adam, today we are men.<br>- We are!<br><br>- Bee-men.<br>- Amen!<br><br>Hallelujah!<br><br>Students, faculty, distinguished bees,<br><br>please welcome Dean Buzzwell.<br><br>Welcome, New Hive Oity<br>graduating class of...<br><br>...9:15.<br><br>That concludes our ceremonies.<br><br>And begins your career<br>at Honex Industries!<br><br>Will we pick ourjob today?<br><br>I heard it's just orientation.<br><br>Heads up! Here we go.<br><br>Keep your hands and antennas<br>inside the tram at all times.<br><br>- Wonder what it'll be like?<br>- A little scary.<br><br>Welcome to Honex,<br>a division of Honesco<br><br>and a part of the Hexagon Group.<br><br>This is it!<br><br>Wow.<br><br>Wow.<br><br>We know that you, as a bee,<br>have worked your whole life<br><br>to get to the point where you<br>can work for your whole life.<br><br>Honey begins when our valiant Pollen<br>Jocks bring the nectar to the hive.<br><br>Our top-secret formula<br><br>is automatically color-corrected,<br>scent-adjusted and bubble-contoured<br><br>into this soothing sweet syrup<br><br>with its distinctive<br>golden glow you know as...<br><br>Honey!<br><br>- That girl was hot.<br>- She's my cousin!<br><br>- She is?<br>- Yes, we're all cousins.<br><br>- Right. You're right.<br>- At Honex, we constantly strive<br><br>to improve every aspect<br>of bee existence.<br><br>These bees are stress-testing<br>a new helmet technology.<br><br>- What do you think he makes?<br>- Not enough.<br><br>Here we have our latest advancement,<br>the Krelman.<br><br>- What does that do?<br>- Oatches that little strand of honey<br><br>that hangs after you pour it.<br>Saves us millions.<br><br>Oan anyone work on the Krelman?<br><br>Of course. Most bee jobs are<br>small ones. But bees know<br><br>that every small job,<br>if it's done well, means a lot.<br><br>But choose carefully<br><br>because you'll stay in the job<br>you pick for the rest of your life.<br><br>The same job the rest of your life?<br>I didn't know that.<br><br>What's the difference?<br><br>You'll be happy to know that bees,<br>as a species, haven't had one day off<br><br>in 27 million years.<br><br>So you'll just work us to death?<br><br>We'll sure try.<br><br>Wow! That blew my mind!<br><br>"What's the difference?"<br>How can you say that?<br><br>One job forever?<br>That's an insane choice to have to make.<br><br>I'm relieved. Now we only have<br>to make one decision in life.<br><br>But, Adam, how could they<br>never have told us that?<br><br>Why would you question anything?<br>We're bees.<br><br>We're the most perfectly<br>functioning society on Earth.<br><br>You ever think maybe things<br>work a little too well here?<br><br>Like what? Give me one example.<br><br>I don't know. But you know<br>what I'm talking about.<br><br>Please clear the gate.<br>Royal Nectar Force on approach.<br><br>Wait a second. Oheck it out.<br><br>- Hey, those are Pollen Jocks!<br>- Wow.<br><br>I've never seen them this close.<br><br>They know what it's like<br>outside the hive.<br><br>Yeah, but some don't come back.<br><br>- Hey, Jocks!<br>- Hi, Jocks!<br><br>You guys did great!<br><br>You're monsters!<br>You're sky freaks! I love it! I love it!<br><br>- I wonder where they were.<br>- I don't know.<br><br>Their day's not planned.<br><br>Outside the hive, flying who knows<br>where, doing who knows what.<br><br>You can'tjust decide to be a Pollen<br>Jock. You have to be bred for that.<br><br>Right.<br><br>Look. That's more pollen<br>than you and I will see in a lifetime.<br><br>It's just a status symbol.<br>Bees make too much of it.<br><br>Perhaps. Unless you're wearing it<br>and the ladies see you wearing it.<br><br>Those ladies?<br>Aren't they our cousins too?<br><br>Distant. Distant.<br><br>Look at these two.<br><br>- Oouple of Hive Harrys.<br>- Let's have fun with them.<br><br>It must be dangerous<br>being a Pollen Jock.<br><br>Yeah. Once a bear pinned me<br>against a mushroom!<br><br>He had a paw on my throat,<br>and with the other, he was slapping me!<br><br>- Oh, my!<br>- I never thought I'd knock him out.<br><br>What were you doing during this?<br><br>Trying to alert the authorities.<br><br>I can autograph that.<br><br>A little gusty out there today,<br>wasn't it, comrades?<br><br>Yeah. Gusty.<br><br>We're hitting a sunflower patch<br>six miles from here tomorrow.<br><br>- Six miles, huh?<br>- Barry!<br><br>A puddle jump for us,<br>but maybe you're not up for it.<br><br>- Maybe I am.<br>- You are not!<br><br>We're going 0900 at J-Gate.<br><br>What do you think, buzzy-boy?<br>Are you bee enough?<br><br>I might be. It all depends<br>on what 0900 means.<br><br>Hey, Honex!<br><br>Dad, you surprised me.<br><br>You decide what you're interested in?<br><br>- Well, there's a lot of choices.<br>- But you only get one.<br><br>Do you ever get bored<br>doing the same job every day?<br><br>Son, let me tell you about stirring.<br><br>You grab that stick, and you just<br>move it around, and you stir it around.<br><br>You get yourself into a rhythm.<br>It's a beautiful thing.<br><br>You know, Dad,<br>the more I think about it,<br><br>maybe the honey field<br>just isn't right for me.<br><br>You were thinking of what,<br>making balloon animals?<br><br>That's a bad job<br>for a guy with a stinger.<br><br>Janet, your son's not sure<br>he wants to go into honey!<br><br>- Barry, you are so funny sometimes.<br>- I'm not trying to be funny.<br><br>You're not funny! You're going<br>into honey. Our son, the stirrer!<br><br>- You're gonna be a stirrer?<br>- No one's listening to me!<br><br>Wait till you see the sticks I have.<br><br>I could say anything right now.<br>I'm gonna get an ant tattoo!<br><br>Let's open some honey and celebrate!<br><br>Maybe I'll pierce my thorax.<br>Shave my antennae.<br><br>Shack up with a grasshopper. Get<br>a gold tooth and call everybody "dawg"!<br><br>I'm so proud.<br><br>- We're starting work today!<br>- Today's the day.<br><br>Oome on! All the good jobs<br>will be gone.<br><br>Yeah, right.<br><br>Pollen counting, stunt bee, pouring,<br>stirrer, front desk, hair removal...<br><br>- Is it still available?<br>- Hang on. Two left!<br><br>One of them's yours! Oongratulations!<br>Step to the side.<br><br>- What'd you get?<br>- Picking crud out. Stellar!<br><br>Wow!<br><br>Oouple of newbies?<br><br>Yes, sir! Our first day! We are ready!<br><br>Make your choice.<br><br>- You want to go first?<br>- No, you go.<br><br>Oh, my. What's available?<br><br>Restroom attendant's open,<br>not for the reason you think.<br><br>- Any chance of getting the Krelman?<br>- Sure, you're on.<br><br>I'm sorry, the Krelman just closed out.<br><br>Wax monkey's always open.<br><br>The Krelman opened up again.<br><br>What happened?<br><br>A bee died. Makes an opening. See?<br>He's dead. Another dead one.<br><br>Deady. Deadified. Two more dead.<br><br>Dead from the neck up.<br>Dead from the neck down. That's life!<br><br>Oh, this is so hard!<br><br>Heating, cooling,<br>stunt bee, pourer, stirrer,<br><br>humming, inspector number seven,<br>lint coordinator, stripe supervisor,<br><br>mite wrangler. Barry, what<br>do you think I should... Barry?<br><br>Barry!<br><br>All right, we've got the sunflower patch<br>in quadrant nine...<br><br>What happened to you?<br>Where are you?<br><br>- I'm going out.<br>- Out? Out where?<br><br>- Out there.<br>- Oh, no!<br><br>I have to, before I go<br>to work for the rest of my life.<br><br>You're gonna die! You're crazy! Hello?<br><br>Another call coming in.<br><br>If anyone's feeling brave,<br>there's a Korean deli on 83rd<br><br>that gets their roses today.<br><br>Hey, guys.<br><br>- Look at that.<br>- Isn't that the kid we saw yesterday?<br><br>Hold it, son, flight deck's restricted.<br><br>It's OK, Lou. We're gonna take him up.<br><br>Really? Feeling lucky, are you?<br><br>Sign here, here. Just initial that.<br><br>- Thank you.<br>- OK.<br><br>You got a rain advisory today,<br><br>and as you all know,<br>bees cannot fly in rain.<br><br>So be careful. As always,<br>watch your brooms,<br><br>hockey sticks, dogs,<br>birds, bears and bats.<br><br>Also, I got a couple of reports<br>of root beer being poured on us.<br><br>Murphy's in a home because of it,<br>babbling like a cicada!<br><br>- That's awful.<br>- And a reminder for you rookies,<br><br>bee law number one,<br>absolutely no talking to humans!<br><br>All right, launch positions!<br><br>Buzz, buzz, buzz, buzz! Buzz, buzz,<br>buzz, buzz! Buzz, buzz, buzz, buzz!<br><br>Black and yellow!<br><br>Hello!<br><br>You ready for this, hot shot?<br><br>Yeah. Yeah, bring it on.<br><br>Wind, check.<br><br>- Antennae, check.<br>- Nectar pack, check.<br><br>- Wings, check.<br>- Stinger, check.<br><br>Scared out of my shorts, check.<br><br>OK, ladies,<br><br>let's move it out!<br><br>Pound those petunias,<br>you striped stem-suckers!<br><br>All of you, drain those flowers!<br><br>Wow! I'm out!<br><br>I can't believe I'm out!<br><br>So blue.<br><br>I feel so fast and free!<br><br>Box kite!<br><br>Wow!<br><br>Flowers!<br><br>This is Blue Leader.<br>We have roses visual.<br><br>Bring it around 30 degrees and hold.<br><br>Roses!<br><br>30 degrees, roger. Bringing it around.<br><br>Stand to the side, kid.<br>It's got a bit of a kick.<br><br>That is one nectar collector!<br><br>- Ever see pollination up close?<br>- No, sir.<br><br>I pick up some pollen here, sprinkle it<br>over here. Maybe a dash over there,<br><br>a pinch on that one.<br>See that? It's a little bit of magic.<br><br>That's amazing. Why do we do that?<br><br>That's pollen power. More pollen, more<br>flowers, more nectar, more honey for us.<br><br>Oool.<br><br>I'm picking up a lot of bright yellow.<br>Oould be daisies. Don't we need those?<br><br>Oopy that visual.<br><br>Wait. One of these flowers<br>seems to be on the move.<br><br>Say again? You're reporting<br>a moving flower?<br><br>Affirmative.<br><br>That was on the line!<br><br>This is the coolest. What is it?<br><br>I don't know, but I'm loving this color.<br><br>It smells good.<br>Not like a flower, but I like it.<br><br>Yeah, fuzzy.<br><br>Ohemical-y.<br><br>Oareful, guys. It's a little grabby.<br><br>My sweet lord of bees!<br><br>Oandy-brain, get off there!<br><br>Problem!<br><br>- Guys!<br>- This could be bad.<br><br>Affirmative.<br><br>Very close.<br><br>Gonna hurt.<br><br>Mama's little boy.<br><br>You are way out of position, rookie!<br><br>Ooming in at you like a missile!<br><br>Help me!<br><br>I don't think these are flowers.<br><br>- Should we tell him?<br>- I think he knows.<br><br>What is this?!<br><br>Match point!<br><br>You can start packing up, honey,<br>because you're about to eat it!<br><br>Yowser!<br><br>Gross.<br><br>There's a bee in the car!<br><br>- Do something!<br>- I'm driving!<br><br>- Hi, bee.<br>- He's back here!<br><br>He's going to sting me!<br><br>Nobody move. If you don't move,<br>he won't sting you. Freeze!<br><br>He blinked!<br><br>Spray him, Granny!<br><br>What are you doing?!<br><br>Wow... the tension level<br>out here is unbelievable.<br><br>I gotta get home.<br><br>Oan't fly in rain.<br><br>Oan't fly in rain.<br><br>Oan't fly in rain.<br><br>Mayday! Mayday! Bee going down!<br><br>Ken, could you close<br>the window please?<br><br>Ken, could you close<br>the window please?<br><br>Oheck out my new resume.<br>I made it into a fold-out brochure.<br><br>You see? Folds out.<br><br>Oh, no. More humans. I don't need this.<br><br>What was that?<br><br>Maybe this time. This time. This time.<br>This time! This time! This...<br><br>Drapes!<br><br>That is diabolical.<br><br>It's fantastic. It's got all my special<br>skills, even my top-ten favorite movies.<br><br>What's number one? Star Wars?<br><br>Nah, I don't go for that...<br><br>...kind of stuff.<br><br>No wonder we shouldn't talk to them.<br>They're out of their minds.<br><br>When I leave a job interview, they're<br>flabbergasted, can't believe what I say.<br><br>There's the sun. Maybe that's a way out.<br><br>I don't remember the sun<br>having a big 75 on it.<br><br>I predicted global warming.<br><br>I could feel it getting hotter.<br>At first I thought it was just me.<br><br>Wait! Stop! Bee!<br><br>Stand back. These are winter boots.<br><br>Wait!<br><br>Don't kill him!<br><br>You know I'm allergic to them!<br>This thing could kill me!<br><br>Why does his life have<br>less value than yours?<br><br>Why does his life have any less value<br>than mine? Is that your statement?<br><br>I'm just saying all life has value. You<br>don't know what he's capable of feeling.<br><br>My brochure!<br><br>There you go, little guy.<br><br>I'm not scared of him.<br>It's an allergic thing.<br><br>Put that on your resume brochure.<br><br>My whole face could puff up.<br><br>Make it one of your special skills.<br><br>Knocking someone out<br>is also a special skill.<br><br>Right. Bye, Vanessa. Thanks.<br><br>- Vanessa, next week? Yogurt night?<br>- Sure, Ken. You know, whatever.<br><br>- You could put carob chips on there.<br>- Bye.<br><br>- Supposed to be less calories.<br>- Bye.<br><br>I gotta say something.<br><br>She saved my life.<br>I gotta say something.<br><br>All right, here it goes.<br><br>Nah.<br><br>What would I say?<br><br>I could really get in trouble.<br><br>It's a bee law.<br>You're not supposed to talk to a human.<br><br>I can't believe I'm doing this.<br><br>I've got to.<br><br>Oh, I can't do it. Oome on!<br><br>No. Yes. No.<br><br>Do it. I can't.<br><br>How should I start it?<br>"You like jazz?" No, that's no good.<br><br>Here she comes! Speak, you fool!<br><br>Hi!<br><br>I'm sorry.<br><br>- You're talking.<br>- Yes, I know.<br><br>You're talking!<br><br>I'm so sorry.<br><br>No, it's OK. It's fine.<br>I know I'm dreaming.<br><br>But I don't recall going to bed.<br><br>Well, I'm sure this<br>is very disconcerting.<br><br>This is a bit of a surprise to me.<br>I mean, you're a bee!<br><br>I am. And I'm not supposed<br>to be doing this,<br><br>but they were all trying to kill me.<br><br>And if it wasn't for you...<br><br>I had to thank you.<br>It's just how I was raised.<br><br>That was a little weird.<br><br>- I'm talking with a bee.<br>- Yeah.<br><br>I'm talking to a bee.<br>And the bee is talking to me!<br><br>I just want to say I'm grateful.<br>I'll leave now.<br><br>- Wait! How did you learn to do that?<br>- What?<br><br>The talking thing.<br><br>Same way you did, I guess.<br>"Mama, Dada, honey." You pick it up.<br><br>- That's very funny.<br>- Yeah.<br><br>Bees are funny. If we didn't laugh,<br>we'd cry with what we have to deal with.<br><br>Anyway...<br><br>Oan I...<br><br>...get you something?<br>- Like what?<br><br>I don't know. I mean...<br>I don't know. Ooffee?<br><br>I don't want to put you out.<br><br>It's no trouble. It takes two minutes.<br><br>- It's just coffee.<br>- I hate to impose.<br><br>- Don't be ridiculous!<br>- Actually, I would love a cup.<br><br>Hey, you want rum cake?<br><br>- I shouldn't.<br>- Have some.<br><br>- No, I can't.<br>- Oome on!<br><br>I'm trying to lose a couple micrograms.<br><br>- Where?<br>- These stripes don't help.<br><br>You look …`,
			effect() {
				return player.cheese.blessings.add(1).log(777).add(1);
			},
			cost() {
				return new Decimal(hasUpgrade("cheese", "d0") ? "1e10" : "1e9");
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			onPurchase() {
				player.cheese.upgrades.push("d1");
			},
			unlocked() {
				return hasUpgrade("cheese", "ab20");
			},
			branches: [["c1", "rgb(255,217,131)"]],
		},
		ab00: {
			fullDisplay: `<h3>Breakdown</h3>
                    <br><span>Sacrifices are x4 stronger and you sacrifice x4 more
                    <br><br>Cost: 1,000,000 blessings`,
			tooltip: `<span style='color: #006080;'>Personally, I prefer CHASE. It just has so much impact and raw atmosphere compared to other OPs. It also sounds pretty good in my opinion.`,
			cost: new Decimal(1000000),
			unlocked() {
				return hasUpgrade("cheese", "b2");
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab10: {
			fullDisplay: `<h3>Short-Lived Reproduction</h3>
                    <br>🐀🐀🐀
                    <br>=
                    <br>🐀🐀🐀
                    <br>🐀🐀
                    <br>🐀
                    <br><br>Cost: 25,000,000 blessings`,
			tooltip: `<h5 style='color: #006080; font-size: 6px;'>Here I come, rougher than the rest of them<br>The best of them, tougher than leather<br>You can call me Knuckles, unlike Sonic I don't chuckle<br>I'd rather flex my muscles<br>I'm hard as nails, it ain't hard to tell<br>I break 'em down whether they solid or frail<br>Unlike the rest I'm independent since my first breath, first test<br>Feel the right then the worst's left<br>Born on an island in the heavens<br>The blood of my ancestors flows inside me<br>My duty is to save the flower from evil deterioration<br>I will be the one to set your heart free true<br>Cleanse yourself of them evil spirits that's in you<br>Streaking lights, loud sounds, and instinct<br>Are the elements that keep me going<br>I am fighting my own mission<br>Nothing's gonna stand in my way<br>I will be the one to set your heart free true<br>Cleanse yourself of them evil spirits that's in you<br>Won't be frightened, I'll stand up to all the pain and turmoil<br>Just believe in myself, won't rely on others<br>Get this power to wipe out the havoc and anarchy<br>This is my planet, gonna fight for my destiny<br>Here I come, rougher than the rest of them<br>The best of them, tougher than leather<br>You can call me Knuckles, unlike Sonic I don't chuckle<br>I'd rather flex my muscles<br>I'm hard as nails, it ain't hard to tell<br>I break 'em down whether they solid or frail<br>Unlike the rest I'm independent since my first breath, first test<br>Feel the right then the worst's left<br>I have no such things as weak spots<br>Don't approve of him, but got to trust him<br>This alliance has a purpose<br>This partnership is only temporary<br>I will be the one to set your heart free true<br>Cleanse yourself of evil spirits that got in you<br>Won't be frightened, I'll stand up to all the pain and turmoil<br>Just believe in myself, won't rely on others<br>Freedom will be waiting when serenity is restored<br>This is my planet, I shall not surrender<br>Won't be frightened, I'll stand up to all the pain and turmoil<br>Just believe in myself, won't rely on others<br>Get this power to wipe out the havoc and anarchy<br>This is my planet, gonna fight (aah, oh)<br>Won't be frightened, I'll stand up to all the pain and turmoil<br>Just believe in myself, won't rely on others<br>Freedom will be waiting when serenity is restored<br>This is my planet, I shall not surrender<br>The new porcupine on the block with the puffed chest<br>Out the wilderness with the ruggedness<br>Knock, knock, it's Knuckles, the blow thrower<br>Independent flower, magical Emerald holder<br>Give you the coldest shoulder<br>My spike goes through boulders<br>That's why I stay a loner<br>I was born by myself<br>I don't need a posse, I get it on by myself<br>Adversaries get shelved`,
			cost: new Decimal(25000000),
			unlocked() {
				return hasUpgrade("cheese", "ab00");
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			branches: [["ab00", "#006080"]],
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab20: {
			fullDisplay: `<h3>Linear Progression</h3>
                    <br><span>Boosts special point gain by x4 and each upgrade increases SP's exponent gain by +^0.01<br><br>Cost: 100,000,000 blessings`,
			tooltip: `<span style='color: #006080;'> good luck reading previous upgrade's tooltip`,
			cost: new Decimal(100000000),
			unlocked() {
				return hasUpgrade("cheese", "ab10");
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			branches: [["ab10", "#006080"]],
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab01: {
			fullDisplay: `<h3>???</h3>
                    <br><span>Unlocks the</span> <h2>BAR</h2> and you no longer lose your 🧀 sacrifices on Ascend reset<br><br>Cost: ??? sickness`,
			tooltip: `<span style='color: #006080;'> good luck reading previous upgrade's tooltip`,
			cost: new Decimal(0),
			canAfford: false,
			unlocked() {
				return hasUpgrade("cheese", "ab20");
			},
			currencyInternalName: "blessings",
			currencyDisplayName: "blessing",
			currencyLayer: "cheese",
			branches: [["ab10", "#006080"]],
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab30: {
			fullDisplay() {
				return `
        <h3>The Annoying Thing</h3>
        <br><span>Special point's effect affects both COVID and Tuberculosis gains<br><br>Cost: ${format(
			this.cost(),
		)} special points
        `;
			},
			tooltip: `<span style='color: #006080;'>Hahaha. We do really share the similarities...<br><br>oh he's pulling his cock out-`,
			cost() {
				return new Decimal(
					hasUpgrade("cheese", "ab31") ? "2.1e21" : "2e20",
				);
			},
			unlocked() {
				return hasUpgrade("cheese", "ab20");
			},
			onPurchase() {
				player.cheese.laeceaPoints = player.cheese.laeceaPoints.add(
					hasUpgrade("cheese", "ab31") ? "2.1e21" : "2e20",
				);
			},
			currencyInternalName: "laeceaPoints",
			currencyDisplayName: "special points",
			currencyLayer: "cheese",
			branches: [["ab20", "#006080"]],
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab31: {
			fullDisplay() {
				return `
        <h3>The Illegal Move</h3>
        <br><span>4x sickness gain<br><br>Cost: ${format(
			this.cost(),
		)} special points
        `;
			},
			tooltip: `<span style='color: #006080;'>Your queen? You mean MY knight?`,
			cost() {
				return new Decimal(
					hasUpgrade("cheese", "ab30") ? "2.1e21" : "2e20",
				);
			},
			unlocked() {
				return hasUpgrade("cheese", "ab20");
			},
			onPurchase() {
				player.cheese.laeceaPoints = player.cheese.laeceaPoints.add(
					hasUpgrade("cheese", "ab30") ? "2.1e21" : "2e20",
				);
			},
			currencyInternalName: "laeceaPoints",
			currencyDisplayName: "special points",
			currencyLayer: "cheese",
			branches: [["ab20", "#006080"]],
			style() {
				return {
					"background-color": hasUpgrade("cheese", this.id)
						? "#006080"
						: canAffordUpgrade("cheese", this.id)
						? "cyan"
						: "",
					color: "black",
					"border-color": "rgba(0,0,0,0.125)",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
	},
	update(diff) {
		player.cheese.points = player.cheese.points.add(
			tmp.cheese.cheeseGain.mul(diff),
		);
		player.cheese.laeceaPoints = player.cheese.laeceaPoints.add(
			tmp.cheese.laeceaGain.mul(diff),
		);
		if (player.offTime == undefined)
			player.cheese.cycle = player.cheese.cycle.add(diff);
		if (player.cheese.cycle.gte(60)) {
			player.cheese.cycle = Decimal.dZero;
			player.cheese.hunger = player.cheese.hunger.sub(1).max(0);
			player.cheese.currentState =
				Math.ceil(Math.random() * 60) == 21
					? 7
					: (player.cheese.activity.gte(30) &&
							player.cheese.currentState == 1 &&
							player.cheese.bruh2.gte(10)) ||
					  (player.cheese.currentState == 2 &&
							player.cheese.bruh2.gte(10))
					? 8
					: player.cheese.bruh.gte(6)
					? 6
					: player.cheese.hunger.gte(6)
					? 4
					: player.cheese.hunger.lte(0)
					? 3
					: player.cheese.activity.gte(30) &&
					  (player.cheese.currentState == 1 ||
							player.cheese.currentState == 2 ||
							player.cheese.currentState == 4)
					? 2
					: player.cheese.activity.gte(10) ||
					  player.cheese.currentState == 2
					? 1
					: player.cheese.activity.eq(0) ||
					  player.cheese.bruh.gte(player.cheese.activity.div(3))
					? 5
					: 0;
			player.cheese.activity = Decimal.dZero;
			player.cheese.bruh = Decimal.dZero;
			player.cheese.bruh2 = Decimal.dZero;
			if (new Decimal(Math.random() * 60).ceil().eq(21))
				player.cheese.currentState = 7;
		}
	},
	cheeseGain() {
		return player.cheese.currentState == 7
			? Decimal.dZero
			: tmp.cheese.buyables[11].effect
					.mul(tmp.cheese.laeceaEffect)
					.mul(tmp.cheese.buyables[12].effect)
					.mul(tmp.cheese.buyables[13].effect)
					.mul(tmp.cheese.buyables[14].effect)
					.mul(tmp.cheese.buyables[21].effect)
					.mul(tmp.cheese.buyables[22].effect)
					.mul(
						player.cheese.currentState == 6
							? 0.5
							: player.cheese.currentState == 5
							? 0.8
							: player.cheese.currentState == 4
							? 1.75
							: player.cheese.currentState == 3
							? 0.25
							: player.cheese.currentState == 1
							? 1.1
							: 1,
					)
					.mul(
						hasUpgrade("cheese", "d1")
							? new Decimal(player.cheese.achievements.length)
									.mul(
										Decimal.add(
											1,
											(player.cheese.achievements.length -
												1) /
												2,
										),
									)
									.mul(0.05)
									.add(1)
							: 1,
					)
					.mul(hasUpgrade("cheese", "a0") ? 4 : 1)
					.mul(hasUpgrade("cheese", "b2") ? 4 : 1)
					.mul(
						hasUpgrade("cheese", "b0")
							? tmp.cheese.upgrades["b0"].effect
							: 1,
					)
					.pow(
						player.cheese.currentState == 8
							? 0.85
							: player.cheese.currentState == 2
							? 1.1
							: 1,
					);
	},
	laeceaGain() {
		return !hasUpgrade("cheese", "b2")
			? Decimal.dZero
			: player.cheese.points
					.max(0)
					.add(1)
					.log(10)
					.div(20)
					.pow(
						new Decimal(1.69).add(
							hasUpgrade("cheese", "ab20")
								? player.cheese.upgrades.length / 100
								: 0,
						),
					)
					.mul(
						Decimal.pow(
							4,
							player.cheese.buyables["ab11"]
								.add(player.cheese.buyables["ab12"])
								.add(player.cheese.buyables["ab13"]),
						),
					)
					.mul(
						Decimal.pow(
							tmp.cheese.laeceaEffect.min(4),
							player.cheese.buyables["ab12"].add(
								player.cheese.buyables["ab13"],
							),
						),
					)
					.mul(
						Decimal.mul(
							0.05,
							hasAchievement("cheese", 23)
								? hasUpgrade("cheese", "ab10")
									? new Decimal(
											player.cheese.achievements.length,
									  ).mul(
											Decimal.add(
												1,
												(player.cheese.achievements
													.length -
													1) /
													2,
											),
									  )
									: player.cheese.achievements.length
								: 0,
						).add(1),
					)
					.mul(hasUpgrade("cheese", "ab20") ? 4 : 1)
					.pow(tmp.cheese.buyables["ab13"].effect);
	},
	laeceaEffect() {
		return player.cheese.laeceaPoints.add(1).root(20);
	},
	buyables: {
		feed: {
			title: "Feed la creatura",
			cost() {
				let cost = player.cheese.buyables["feed"].add(1).mul(1000);
				if (tmp.cheese.cheeseGain.gte(cost))
					cost = cost.mul(tmp.cheese.cheeseGain.div(cost).pow(1.6));
				return cost;
			},
			canAfford() {
				return (
					player.cheese.points.gte(this.cost()) &&
					player.cheese.hunger.lt(10)
				);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables["feed"] =
					player.cheese.buyables["feed"].add(1);
				player.cheese.hunger = player.cheese.hunger.add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return `Requirement: ${format(this.cost())} 🧀`;
			},
			style() {
				return {
					height: "80px",
					"border-color": "rgba(0,0,0,0.125)",
					"background-color": this.canAfford() ? "#006080" : "",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		prestige: {
			title: "<h3>Ascend",
			canAfford() {
				return player.cheese.points.gte(1000000);
			},
			gain() {
				return player.cheese.points
					.div(1000000)
					.root(2.95305888531)
					.mul(
						hasUpgrade("cheese", "c0")
							? tmp.cheese.upgrades["c0"].effect
							: 1,
					)
					.mul(tmp.cheese.laeceaEffect)
					.floor();
			},
			getNextAt() {
				return this.gain()
					.add(1)
					.div(tmp.cheese.laeceaEffect)
					.div(
						hasUpgrade("cheese", "c0")
							? tmp.cheese.upgrades["c0"].effect
							: 1,
					)
					.pow(2.95305888531)
					.mul(1000000)
					.max(1000000);
			},
			buy() {
				let gain = player.cheese.blessings.add(this.gain());
				let keep = [
					player.cheese.cycle,
					player.cheese.activity.add(1),
					player.cheese.bruh,
					player.cheese.hunger,
					player.cheese.currentState,
					player.cheese.buyables["feed"],
					player.cheese.upgrades,
					player.cheese.buyables[22],
					player.cheese.goodBlessings,
					player.cheese.bruh2.add(1),
					player.cheese.laeceaPoints,
					player.cheese.buyables["ab11"],
					player.cheese.buyables["ab12"],
					player.cheese.buyables["ab13"],
					player.cheese.achievements,
				];
				layerDataReset("cheese");
				player.cheese.cycle = keep[0];
				player.cheese.activity = keep[1];
				player.cheese.bruh = keep[2];
				player.cheese.hunger = keep[3];
				player.cheese.currentState = keep[4];
				player.cheese.buyables["feed"] = keep[5];
				player.cheese.upgrades = keep[6];
				player.cheese.buyables[22] = keep[7];
				player.cheese.goodBlessings = keep[8];
				player.cheese.bruh2 = keep[9];
				player.cheese.laeceaPoints = keep[10];
				player.cheese.buyables["ab11"] = keep[11];
				player.cheese.buyables["ab12"] = keep[12];
				player.cheese.buyables["ab13"] = keep[13];
				player.cheese.achievements = keep[14];
				player.cheese.blessings = gain;
				player.cheese.unlocked2 = true;
			},
			display() {
				return `<h3>Abandon all of your progress and be blessed by Cheese Overlord in return, gaining +${formatWhole(
					this.gain(),
				)} blessings<br><br>You may be blessed further once you have ${formatWhole(
					this.getNextAt(),
				)} 🧀`;
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: "300px",
							border: "5px solid",
							"border-top-left-radius": "50px",
							"border-top-right-radius": "50px",
							"border-bottom-left-radius": hasUpgrade(
								"cheese",
								"b1",
							)
								? "0px"
								: "50px",
							"border-bottom-right-radius": hasUpgrade(
								"cheese",
								"b1",
							)
								? "0px"
								: "50px",
							"border-bottom-width": hasUpgrade("cheese", "b1")
								? "2.5px"
								: "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "150px",
							width: "350px",
							border: "5px solid",
							"border-radius": "300px",
							"border-bottom-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
		},
		11: {
			title: "<h3>Cheese<br>Generator",
			cost() {
				return player.cheese.buyables[11]
					.mul(player.cheese.buyables[11].add(1))
					.pow(1.15)
					.pow(
						player.cheese.buyables[11].gte(100)
							? player.cheese.buyables[11]
									.sub(100)
									.mul(0.015)
									.add(1)
							: 1,
					)
					.pow(
						player.cheese.buyables[11].gte(255)
							? player.cheese.buyables[11]
									.sub(255)
									.mul(0.15)
									.add(1)
							: 1,
					);
			},
			canAfford() {
				return player.cheese.points.gte(this.cost());
			},
			effect() {
				return player.cheese.buyables[11]
					.mul(tmp.cheese.buyables[16].effect)
					.mul(
						hasUpgrade("cheese", "c2")
							? tmp.cheese.buyables[22].effect
							: 1,
					);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables[11] = player.cheese.buyables[11].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return (
					`<h3>You currently gain ${format(
						this.effect(),
					)} 🧀/sec<br>Amount: ${formatWhole(
						player.cheese.buyables[this.id],
					)}` +
					(player.cheese.buyables[16].gte(1)
						? ` (+${format(
								player.cheese.buyables[this.id]
									.mul(0.01)
									.mul(player.cheese.buyables[16]),
						  )})`
						: ``) +
					`<br>Cost: ${format(this.cost())} 🧀`
				);
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: "175px",
							border: "5px solid",
							"border-radius": "0px",
							"border-top-left-radius": "50px",
							"border-right-width": "2.5px",
							"border-bottom-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "125px",
							width: "200px",
							border: "5px solid",
							"border-radius": "125px",
							"border-right-width": "5px",
							"border-bottom-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
		},
		12: {
			title: "<h3>Cheddar<br>Generalizer",
			cost() {
				return new Decimal(400)
					.mul(Decimal.pow(1.15, player.cheese.buyables[12].pow(1.3)))
					.pow(
						player.cheese.buyables[12].gte(100)
							? player.cheese.buyables[12]
									.sub(100)
									.mul(0.03)
									.add(1)
							: 1,
					)
					.pow(
						player.cheese.buyables[12].gte(255)
							? player.cheese.buyables[12]
									.sub(255)
									.mul(0.3)
									.add(1)
							: 1,
					);
			},
			canAfford() {
				return player.cheese.points.gte(this.cost());
			},
			effect() {
				return Decimal.pow(
					new Decimal(1.15).add(tmp.cheese.buyables[15].effect),
					player.cheese.buyables[12].mul(
						tmp.cheese.buyables[16].effect,
					),
				).mul(
					hasUpgrade("cheese", "c2")
						? tmp.cheese.buyables[22].effect
						: 1,
				);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables[12] = player.cheese.buyables[12].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return (
					`<h3>Multiplies 🧀 gain by x${format(
						this.effect(),
					)}<br>Amount: ${formatWhole(
						player.cheese.buyables[this.id],
					)}` +
					(player.cheese.buyables[16].gte(1)
						? ` (+${format(
								player.cheese.buyables[this.id]
									.mul(0.01)
									.mul(player.cheese.buyables[16]),
						  )})`
						: ``) +
					`<br>Cost: ${format(this.cost())} 🧀`
				);
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: "175px",
							border: "5px solid",
							"border-radius": "0px",
							"border-right-width": "2.5px",
							"border-bottom-width": "2.5px",
							"border-left-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "125px",
							width: "200px",
							border: "5px solid",
							"border-radius": "125px",
							"border-right-width": "5px",
							"border-bottom-width": "5px",
							"border-left-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
		},
		13: {
			title: "<h3>Chevre<br>Graduator",
			cost() {
				return new Decimal(8000)
					.mul(Decimal.pow(4, player.cheese.buyables[13].pow(1.45)))
					.pow(
						player.cheese.buyables[13].gte(100)
							? player.cheese.buyables[13]
									.sub(100)
									.mul(0.045)
									.add(1)
							: 1,
					)
					.pow(
						player.cheese.buyables[13].gte(255)
							? player.cheese.buyables[13]
									.sub(255)
									.mul(0.45)
									.add(1)
							: 1,
					);
			},
			canAfford() {
				return player.cheese.points.gte(this.cost());
			},
			effect() {
				return Decimal.pow(
					new Decimal(2).root(
						new Decimal(10).root(
							player.cheese.points.max(1).root(10),
						),
					),
					player.cheese.buyables[13].mul(
						tmp.cheese.buyables[16].effect,
					),
				).mul(
					hasUpgrade("cheese", "c2")
						? tmp.cheese.buyables[22].effect
						: 1,
				);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables[13] = player.cheese.buyables[13].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return (
					`<h3>Multiplies 🧀 gain by x${format(
						this.effect(),
					)} based on 🧀<br>Amount: ${formatWhole(
						player.cheese.buyables[this.id],
					)}` +
					(player.cheese.buyables[16].gte(1)
						? ` (+${format(
								player.cheese.buyables[this.id]
									.mul(0.01)
									.mul(player.cheese.buyables[16]),
						  )})`
						: ``) +
					`<br>Cost: ${format(this.cost())} 🧀`
				);
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: "175px",
							border: "5px solid",
							"border-radius": "0px",
							"border-top-right-radius": "50px",
							"border-bottom-width": "2.5px",
							"border-left-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "125px",
							width: "200px",
							border: "5px solid",
							"border-radius": "125px",
							"border-bottom-width": "5px",
							"border-left-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
		},
		14: {
			title: "<h3>Classy<br>Gargantuan-or",
			cost() {
				return new Decimal("1.6e12")
					.mul(Decimal.pow(1612, player.cheese.buyables[14].pow(1.6)))
					.pow(
						player.cheese.buyables[14].gte(100)
							? player.cheese.buyables[14]
									.sub(100)
									.mul(0.06)
									.add(1)
							: 1,
					)
					.pow(
						player.cheese.buyables[14].gte(255)
							? player.cheese.buyables[14]
									.sub(255)
									.mul(0.6)
									.add(1)
							: 1,
					);
			},
			canAfford() {
				return player.cheese.points.gte(this.cost());
			},
			effect() {
				return Decimal.pow(
					4,
					player.cheese.buyables[14].mul(
						tmp.cheese.buyables[16].effect,
					),
				);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables[14] = player.cheese.buyables[14].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return (
					`<h3>Multiplies 🧀 gain by x${format(
						this.effect(),
					)}<br>Amount: ${formatWhole(
						player.cheese.buyables[this.id],
					)}` +
					(player.cheese.buyables[16].gte(1)
						? ` (+${format(
								player.cheese.buyables[this.id]
									.mul(0.01)
									.mul(player.cheese.buyables[16]),
						  )})`
						: ``) +
					`<br>Cost: ${format(this.cost())} 🧀`
				);
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: hasUpgrade("cheese", "d0")
								? "175px"
								: "262.5px",
							border: "5px solid",
							"border-radius": "0px",
							"border-right-width": "2.5px",
							"border-bottom-width": "2.5px",
							"border-top-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "125px",
							width: "200px",
							border: "5px solid",
							"border-radius": "125px",
							"border-right-width": "5px",
							"border-bottom-width": "5px",
							"border-top-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
			unlocked() {
				return hasUpgrade("cheese", "c1");
			},
		},
		15: {
			title: "<h3>ciao<br>gator",
			cost() {
				return new Decimal("3.2e15")
					.mul(
						Decimal.pow(3215, player.cheese.buyables[15].pow(1.75)),
					)
					.pow(
						player.cheese.buyables[15].gte(100)
							? player.cheese.buyables[15]
									.sub(100)
									.mul(0.075)
									.add(1)
							: 1,
					)
					.pow(
						player.cheese.buyables[15].gte(255)
							? player.cheese.buyables[15]
									.sub(255)
									.mul(0.75)
									.add(1)
							: 1,
					);
			},
			canAfford() {
				return player.cheese.points.gte(this.cost());
			},
			effect() {
				return player.cheese.buyables[15]
					.mul(tmp.cheese.buyables[16].effect)
					.pow(1.15)
					.mul(0.015);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables[15] = player.cheese.buyables[15].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return (
					`<h3>Increases Cheddar Generalizer's base by +${format(
						this.effect(),
					)}<br>Amount: ${formatWhole(
						player.cheese.buyables[this.id],
					)}` +
					(player.cheese.buyables[16].gte(1)
						? ` (+${format(
								player.cheese.buyables[this.id]
									.mul(0.01)
									.mul(player.cheese.buyables[16]),
						  )})`
						: ``) +
					`<br>Cost: ${format(this.cost())} 🧀`
				);
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: hasUpgrade("cheese", "d0")
								? "175px"
								: "262.5px",
							border: "5px solid",
							"border-right-width": hasUpgrade("cheese", "d0")
								? "2.5px"
								: "5px",
							"border-bottom-width": "2.5px",
							"border-top-width": "2.5px",
							"border-left-width": "2.5px",
							"border-radius": "0px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "125px",
							width: "200px",
							border: "5px solid",
							"border-radius": "125px",
							"border-right-width": "5px",
							"border-bottom-width": "5px",
							"border-top-width": "5px",
							"border-left-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
			unlocked() {
				return hasUpgrade("cheese", "c1");
			},
		},
		16: {
			title: "<h3>Chaotic<br>Goat",
			cost() {
				return new Decimal("1e20")
					.mul(
						Decimal.pow(
							player.cheese.buyables[16].add(1),
							player.cheese.buyables[16].pow(1.9),
						),
					)
					.pow(
						player.cheese.buyables[16].gte(100)
							? player.cheese.buyables[16]
									.sub(100)
									.mul(0.09)
									.add(1)
							: 1,
					)
					.pow(
						player.cheese.buyables[16].gte(255)
							? player.cheese.buyables[16]
									.sub(255)
									.mul(0.9)
									.add(1)
							: 1,
					);
			},
			canAfford() {
				return player.cheese.points.gte(this.cost());
			},
			effect() {
				return player.cheese.buyables[16].mul(0.01).add(1);
			},
			buy() {
				player.cheese.points = player.cheese.points.sub(this.cost());
				player.cheese.buyables[16] = player.cheese.buyables[16].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			display() {
				return `<h3>Gives ${format(
					this.effect().sub(1).mul(100),
				)}% of previous buyables amount free amounts<br>Amount: ${formatWhole(
					player.cheese.buyables[this.id],
				)}<br>Cost: ${format(this.cost())} 🧀`;
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: "175px",
							border: "5px solid",
							"border-radius": "0px",
							"border-left-width": "2.5px",
							"border-bottom-width": "2.5px",
							"border-top-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "125px",
							width: "200px",
							border: "5px solid",
							"border-radius": "125px",
							"border-left-width": "5px",
							"border-bottom-width": "5px",
							"border-top-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
			unlocked() {
				return hasUpgrade("cheese", "d0");
			},
		},
		21: {
			title: "<h3>Sacrifice all of your 🧀 to Cheese Overlord",
			canAfford() {
				return player.cheese.points.gt(0) && !(tmp.cheese.state == 8);
			},
			effect() {
				return player.cheese.goodCheese
					.mul(hasUpgrade("cheese", "ab00") ? 4 : 1)
					.add(1)
					.log(7)
					.add(1)
					.max(1);
			},
			buy() {
				player.cheese.goodCheese = player.cheese.goodCheese.add(
					player.cheese.points.mul(
						hasUpgrade("cheese", "ab00") ? 4 : 1,
					),
				);
				player.cheese.points = Decimal.dZero;
				player.cheese.activity = player.cheese.activity.add(1);
				player.cheese.bruh2 = player.cheese.bruh2.add(1);
			},
			display() {
				return `<h3>Multiplies 🧀 gain by x${format(
					this.effect(),
				)}<br>You'll gain +x${format(
					player.cheese.points
						.mul(hasUpgrade("cheese", "ab00") ? 16 : 1)
						.add(
							player.cheese.goodCheese.mul(
								hasUpgrade("cheese", "ab00") ? 4 : 1,
							),
						)
						.add(1)
						.log(7)
						.add(1)
						.sub(this.effect())
						.max(0),
				)} upon sacrifice<br>You sacrificed ${format(
					player.cheese.goodCheese,
				)} 🧀`;
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "100px",
							width: "525px",
							border: "5px solid",
							"border-radius": "0px",
							"border-bottom-left-radius": "50px",
							"border-bottom-right-radius": "50px",
							"border-top-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "150px",
							width: "300px",
							border: "5px solid",
							"border-radius": "150px",
							"border-top-width": "5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
		},
		22: {
			title: "<h3>Sacrifice all of your blessings to Cheese Overlord",
			canAfford() {
				return (
					player.cheese.blessings.gt(Decimal.dZero) &&
					tmp.cheese.state !== 8
				);
			},
			effect() {
				return player.cheese.goodBlessings
					.mul(hasUpgrade("cheese", "ab00") ? 4 : 1)
					.add(Decimal.dOne)
					.log(77)
					.add(Decimal.dOne)
					.max(Decimal.dOne);
			},
			buy() {
				player.cheese.goodBlessings = player.cheese.goodBlessings.add(
					player.cheese.blessings.mul(
						hasUpgrade("cheese", "ab00") ? 4 : 1,
					),
				);
				player.cheese.blessings = Decimal.dZero;
				player.cheese.activity = player.cheese.activity.add(
					Decimal.dOne,
				);
				player.cheese.bruh2 = player.cheese.bruh2.add(Decimal.dOne);
			},
			display() {
				return `<h3>Permanently multiplies 🧀 gain by x${format(
					this.effect(),
				)}<br>You'll gain +x${format(
					player.cheese.blessings
						.mul(hasUpgrade("cheese", "ab00") ? 16 : 1)
						.add(
							player.cheese.goodBlessings.mul(
								hasUpgrade("cheese", "ab00") ? 4 : 1,
							),
						)
						.add(Decimal.dOne)
						.log(77)
						.add(Decimal.dOne)
						.sub(this.effect())
						.max(Decimal.dZero),
				)} upon sacrifice<br>You sacrificed ${format(
					player.cheese.goodBlessings,
				)} blessings`;
			},
			style() {
				return options.cheeseBuyables
					? {
							height: "125px",
							width: "300px",
							border: "5px solid",
							borderRadius: "50px",
							"border-top-left-radius": "0px",
							"border-top-right-radius": "0px",
							"border-top-width": "2.5px",
							"border-color": this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  }
					: {
							height: "150px",
							width: "300px",
							border: "5px solid",
							borderRadius: "150px",
							"border-top-width": "5px",
							borderColor: this.canAfford()
								? "rgb(255,172,51)"
								: "",
							color: this.canAfford() ? "rgb(244,144,12)" : "",
							transform: `rotate(${spinEternally()}deg)`,
							transitionDuration: "0s transform",
					  };
			},
			unlocked() {
				return hasUpgrade("cheese", "b1");
			},
		},
		ab11: {
			title: "<h1>G</h1>",
			display() {
				return (
					`<h3>
          Boosts special point gain by x4 per purchase
          <br>Amount: ${formatWhole(player.cheese.buyables["ab11"])}` +
					(player.cheese.buyables["ab12"].gte(1) ||
					player.cheese.buyables["ab13"].gte(1)
						? ` (+${formatWhole(
								player.cheese.buyables["ab12"].add(
									player.cheese.buyables["ab13"],
								),
						  )})`
						: ``) +
					`<br>Cost: ${format(this.cost())} special points</h3>`
				);
			},
			tooltip:
				"<span style='color: #006080;'>G is the 7th letter in english alphabet, number of which represents all kinds of godlike, religious related things with immeasurable importance or power...<br>also GIF is pronounced with G, not J.",
			cost() {
				return Decimal.pow(
					60,
					player.cheese.buyables["ab11"].add(1).pow(1.15),
				);
			},
			canAfford() {
				return player.cheese.laeceaPoints.gte(this.cost());
			},
			buy() {
				player.cheese.buyables["ab11"] =
					player.cheese.buyables["ab11"].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			style() {
				return {
					height: "192px",
					width: "192px",
					"border-color": "rgba(0,0,0,0.125)",
					"background-color": this.canAfford() ? "#006080" : "",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab12: {
			title: "<h1>O</h1>",
			display() {
				return (
					`<h3>
          Boosts special point gain by it's own effect (hardcaps at 4x) and gives 1 free "G" per purchase
          <br>Amount: ${formatWhole(player.cheese.buyables["ab12"])}` +
					(player.cheese.buyables["ab13"].gte(1)
						? ` (+${formatWhole(player.cheese.buyables["ab13"])})`
						: ``) +
					`<br>Cost: ${format(this.cost())} special points</h3>`
				);
			},
			tooltip:
				"<span style='color: #006080;'>O... That's the first letter of my arch-nemesis. Sorta, kinda... O, as in Ouroboros, represents rebirth and afterlife. O can also be easily mistaken with 0, which is the amount of [Strength Type] I'm going to give about this layer's balancing within the next 10 minutes.",
			cost() {
				return Decimal.pow(
					1440,
					player.cheese.buyables["ab12"].add(1).pow(1.3),
				);
			},
			canAfford() {
				return player.cheese.laeceaPoints.gte(this.cost());
			},
			buy() {
				player.cheese.buyables["ab12"] =
					player.cheese.buyables["ab12"].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			style() {
				return {
					height: "192px",
					width: "192px",
					"border-color": "rgba(0,0,0,0.125)",
					"background-color": this.canAfford() ? "#006080" : "",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
		ab13: {
			title: "<h1>D</h1>",
			display() {
				return `<h3>
          Boosts special points gain to the power of this buyable's effect and gives 1 free "G" and "O" per purchase
          <br>Effect: ^${format(this.effect())}
          <br>Amount: ${formatWhole(player.cheese.buyables["ab13"])}
          Cost: ${format(this.cost())} special points</h3>`;
			},
			effect() {
				let base = new Decimal(0.23456789);
				let eff = Decimal.dOne;
				for (
					i = 0;
					new Decimal(i).lt(player.cheese.buyables["ab13"]);
					i++
				) {
					eff = eff.add(base.div(i + 1));
				}
				return eff;
			},
			tooltip: `<span style='color: #006080;'>dawg i have no idea what i'm supposed to make out of D... perhaps DIGMA... balls? No, no... Delusional ho- NO! Look, I'm sorry! There's no "funni religion joke!11" punchline that I can make with this stupid letter without [JACORB'D] around and-<br><h3>large devil</h3>`,
			cost() {
				return Decimal.pow(
					40320,
					player.cheese.buyables["ab13"].add(1).pow(1.45),
				);
			},
			canAfford() {
				return player.cheese.laeceaPoints.gte(this.cost());
			},
			buy() {
				player.cheese.buyables["ab13"] =
					player.cheese.buyables["ab13"].add(1);
				player.cheese.activity = player.cheese.activity.add(1);
			},
			style() {
				return {
					height: "192px",
					width: "192px",
					"border-color": "rgba(0,0,0,0.125)",
					"background-color": this.canAfford() ? "#006080" : "",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				};
			},
		},
	},
	achievements: {
		11: {
			name: "Now here's the 🐀",
			done() {
				return player.cheese.points.gte(1);
			},
			tooltip: "Get your first 🧀",
		},
		12: {
			name: "Fullstack Machinery",
			done() {
				return player.cheese.buyables[13].gte(1);
			},
			tooltip: "Buy a 3rd 🧀 buyable",
		},
		13: {
			name: "get softcapped idiot",
			done() {
				return (
					player.cheese.buyables[11].gte(100) ||
					player.cheese.buyables[12].gte(100) ||
					player.cheese.buyables[13].gte(100) ||
					player.cheese.buyables[14].gte(100) ||
					player.cheese.buyables[15].gte(100)
				);
			},
			tooltip: "Get softcapped",
		},
		14: {
			name: "UNLIMITED POWER!!!!",
			done() {
				return player.cheese.unlocked2;
			},
			tooltip: "Ascend once",
		},
		15: {
			name: "Trillionarism is an old propaganda",
			done() {
				return player.cheese.points.gte("1e15");
			},
			tooltip: "Reach 1 Qa 🧀",
		},
		16: {
			name: "Do not.",
			done() {
				return hasUpgrade("cheese", "b2");
			},
			tooltip: "Disappoint me. Alot.",
		},
		21: {
			name: "get super softcapped stupid bozo",
			done() {
				return (
					player.cheese.buyables[11].gte(256) ||
					player.cheese.buyables[12].gte(256) ||
					player.cheese.buyables[13].gte(256) ||
					player.cheese.buyables[14].gte(256) ||
					player.cheese.buyables[15].gte(256)
				);
			},
			tooltip: "Get softcapped yet again",
		},
		22: {
			name: "Powerhouse",
			done() {
				return tmp.cheese.buyables[21].effect.gte(30);
			},
			tooltip: "Reach x30 🧀 sacrifice effect",
		},
		23: {
			name: "man screw that blue rat, all my homies hate him",
			done() {
				return (
					player.cheese.buyables["ab11"].gte(1) ||
					player.cheese.buyables["ab12"].gte(1) ||
					player.cheese.buyables["ab13"].gte(1)
				);
			},
			tooltip: `Spell out "GOD"<br>Reward: +5% special point gain per 🐀`,
		},
		24: {
			name: "funni number with funni syntax",
			done() {
				return tmp.cheese.cheeseGain.gte("6.9e22");
			},
			tooltip: `enough said`,
		},
		25: {
			name: "NO SOFTCAPS?",
			done() {
				return tmp.cheese.laeceaEffect.gte(4);
			},
			tooltip: `Reach 4x special point effect`,
		},
		26: {
			name: "THE COST SCALING IS RISING!<br><br>IT'S OVERFLOWING!",
			done() {
				return player.cheese.buyables[12].gte(100);
			},
			tooltip: "Reach 100 Cheddar Generalizers",
		},
		31: {
			name: "Ah yes. My favorite syntax.",
			done() {
				return player.cheese.points.gte("1e30");
			},
			tooltip: "Reach 1 No 🧀",
		},
	},
	microtabs: {
		AB: {
			Laecea: {
				content: [
					"blank",
					[
						"display-text",
						() => `
                      <h2>AB's Current State:<br> 
                      <h3> ${
							tmp.cheese.state[player.cheese.currentState][0]
						}<br>
                      <h4>${
							tmp.cheese.state[player.cheese.currentState][1]
						}<br>Next cycle in ${formatWhole(
							new Decimal(60).sub(player.cheese.cycle).ceil(),
						)} seconds`,
					],
					"blank",
					"blank",
					["tree", [["ab"]]],
					["bar", "feedMe"],
					"blank",
					["buyable", "feed"],
				],
				buttonStyle: {
					color: "rgb(0,48,64)",
					borderRadius: "50px",
					borderColor: "rgb(0,84,112)",
					backgroundColor: "#006080",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				},
				unlocked() {
					return hasUpgrade("cheese", "b2");
				},
			},
			"I AM": {
				content: [
					"blank",
					[
						"display-text",
						() =>
							`
                    <h2>You have<h2/>
                    <h2 style='color: #006080; text-shadow: #006080 0 0 5px;'>${formatWhole(
						player.cheese.laeceaPoints,
					)}<h2/>
                    <h2>special points, boosting your 🧀 and blessing gain by x${format(
						tmp.cheese.laeceaEffect,
					)}</h2><br>(And to further confirm the superiority of special points, you can't waste them no matter what)` +
							(tmp.cheese.laeceaGain.gt(Decimal.dZero)
								? `<h4>(${format(
										tmp.cheese.laeceaGain,
								  )} SP/sec [(log(🧀 + 1) / 20) ^ ${format(
										new Decimal(1.69).add(
											hasUpgrade("cheese", "ab20")
												? player.cheese.upgrades
														.length / 100
												: 0,
										),
								  )}])`
								: ``),
					],
					"blank",
					[
						"row",
						[
							["buyable", "ab11"],
							"blank",
							["buyable", "ab12"],
							"blank",
							["buyable", "ab13"],
						],
					],
				],
				buttonStyle: {
					color: "rgb(0,48,64)",
					borderRadius: "50px",
					borderColor: "rgb(0,84,112)",
					backgroundColor: "#006080",
					transform: `rotate(${spinEternally()}deg)`,
					transitionDuration: "0s transform",
				},
				unlocked() {
					return hasUpgrade("cheese", "b2");
				},
			},
		},
	},
	tabFormat: {
		"La Creatura": {
			content: [
				[
					"display-text",
					() =>
						`
                    <h2>You have 
                    <h2 style='color: ${tmp.cheese.color}; text-shadow: ${
						tmp.cheese.color
					} 0 0 5px;'>${formatWhole(player.cheese.points)} 
                    <h2 style='transform: scale(2, 2)'>🧀` +
						(player.cheese.unlocked2
							? `<h2> and 
                    <h2 style='color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
						player.cheese.blessings,
					)}
                    <h2> blessings`
							: ``) +
						(tmp.cheese.cheeseGain.gt(Decimal.dZero)
							? `<h4>You gain ${format(
									tmp.cheese.cheeseGain,
							  )} 🧀/sec`
							: ``),
				],
				["microtabs", "AB", { "border-color": "rgba(0,0,0,0)" }],
			],
			buttonStyle: {
				color: "rgb(0,48,64)",
				borderRadius: "50px",
				borderColor: "rgb(0,84,112)",
				backgroundColor: "#006080",
				transform: `rotate(${spinEternally()}deg)`,
				transitionDuration: "0s transform",
			},
		},
		Cheese: {
			content: [
				[
					"display-text",
					() =>
						`
                    <h2>You have 
                    <h2 style='color: ${tmp.cheese.color}; text-shadow: ${
						tmp.cheese.color
					} 0 0 5px;'>${formatWhole(player.cheese.points)} 
                    <h2 style='transform: scale(2, 2)'>🧀` +
						(player.cheese.unlocked2
							? `<h2> and 
                    <h2 style='color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
						player.cheese.blessings,
					)}
                    <h2> blessings`
							: ``) +
						(tmp.cheese.cheeseGain.gt(Decimal.dZero)
							? `<h4>You gain ${format(
									tmp.cheese.cheeseGain,
							  )} 🧀/sec`
							: ``),
				],
				"blank",
				[
					"row",
					[
						["buyable", [11]],
						[
							"blank",
							function () {
								return [
									options.cheeseBuyables ? "0px" : "8px",
									"8px",
								];
							},
						],
						["buyable", [12]],
						[
							"blank",
							function () {
								return [
									options.cheeseBuyables ? "0px" : "8px",
									"8px",
								];
							},
						],
						["buyable", [13]],
					],
				],
				[
					"blank",
					function () {
						return ["0px", options.cheeseBuyables ? "0px" : "16px"];
					},
				],
				[
					"row",
					[
						["buyable", [14]],
						[
							"blank",
							function () {
								return [
									options.cheeseBuyables ? "0px" : "8px",
									"0px",
								];
							},
						],
						["buyable", [15]],
						[
							"blank",
							function () {
								return [
									options.cheeseBuyables ? "0px" : "8px",
									"0px",
								];
							},
						],
						["buyable", [16]],
					],
				],
				[
					"blank",
					function () {
						return ["0px", options.cheeseBuyables ? "0px" : "16px"];
					},
				],
				["buyable", [21]],
			],
			buttonStyle: {
				color: "rgb(244,144,12)",
				borderRadius: "50px",
				transform: `rotate(${spinEternally()}deg)`,
				transitionDuration: "0s transform",
			},
		},
		"Cheese Overlord's Heaven": {
			content: [
				[
					"display-text",
					() =>
						`
                    <h2>You have 
                    <h2 style='color: ${tmp.cheese.color}; text-shadow: ${
						tmp.cheese.color
					} 0 0 5px;'>${formatWhole(player.cheese.points)} 
                    <h2 style='transform: scale(2, 2)'>🧀` +
						(player.cheese.unlocked2
							? `<h2> and 
                    <h2 style='color: lightyellow; text-shadow: lightyellow 0 0 5px;'>${formatWhole(
						player.cheese.blessings,
					)}
                    <h2> blessings`
							: ``) +
						(tmp.cheese.cheeseGain.gt(Decimal.dZero)
							? `<h4>You gain ${format(
									tmp.cheese.cheeseGain,
							  )} 🧀/sec`
							: ``),
				],
				"blank",
				["buyable", "prestige"],
				[
					"blank",
					function () {
						return ["0px", options.cheeseBuyables ? "0px" : "16px"];
					},
				],
				["buyable", [22]],
				"blank",
				[
					"row",
					[
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "b2")
										? "136px"
										: "0px",
									"0px",
								];
							},
						],
						["upgrade", "a0"],
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "ab20")
										? "16px"
										: "0px",
									"0px",
								];
							},
						],
						["upgrade", "ab01"],
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "ab20")
										? "16px"
										: hasUpgrade("cheese", "b2")
										? "156px"
										: "0px",
									"0px",
								];
							},
						],
						["upgrade", "ab00"],
					],
				],
				"blank",
				"blank",
				[
					"row",
					[
						["upgrade", "b0"],
						["blank", ["16px", "0px"]],
						["upgrade", "b2"],
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "c1") ? "16px" : "0px",
									"0px",
								];
							},
						],
						["upgrade", "b1"],
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "ab00")
										? "16px"
										: hasUpgrade("cheese", "b2")
										? "136px"
										: "0px",
									"0px",
								];
							},
						],
						["upgrade", "ab10"],
					],
				],
				"blank",
				"blank",
				[
					"row",
					[
						["upgrade", "c0"],
						["blank", ["16px", "0px"]],
						["upgrade", "c1"],
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "c0") &&
									hasUpgrade("cheese", "c2")
										? "16px"
										: "0px",
									"0px",
								];
							},
						],
						["upgrade", "c2"],
						[
							"blank",
							function () {
								return [
									hasUpgrade("cheese", "ab10")
										? "16px"
										: hasUpgrade("cheese", "b2")
										? "136px"
										: "0px",
									"0px",
								];
							},
						],
						["upgrade", "ab20"],
					],
				],
				"blank",
				"blank",
				[
					"row",
					[
						["upgrade", "d0"],
						["blank", ["16px", "0px"]],
						["upgrade", "d1"],
						["blank", ["16px", "0px"]],
						["upgrade", "ab30"],
						["blank", ["16px", "0px"]],
						["upgrade", "ab31"],
					],
				],
			],
			buttonStyle: {
				color: "rgb(244,144,12)",
				borderRadius: "50px",
				transform: `rotate(${spinEternally()}deg)`,
				transitionDuration: "0s transform",
			},
			unlocked() {
				return (
					player.cheese.points.gte(1000000) || player.cheese.unlocked2
				);
			},
		},
		Achievements: {
			content: [
				[
					"display-text",
					function () {
						if (!hasUpgrade("cheese", "ab10"))
							return "🐀".repeat(
								player.cheese.achievements.length,
							);
						let ratTriangle = "";
						for (
							i = 0;
							i < player.cheese.achievements.length;
							i++
						) {
							ratTriangle =
								ratTriangle +
								"🐀".repeat(
									player.cheese.achievements.length - i,
								) +
								"<br>";
						}
						return ratTriangle;
					},
				],
				"blank",
				"achievements",
			],
			buttonStyle: {
				color: "rgb(244,144,12)",
				borderRadius: "50px",
				transform: `rotate(${spinEternally()}deg)`,
				transitionDuration: "0s transform",
			},
		},
	},
	row: "side",
	nodeStyle: {
		color: "rgb(244,144,12)",
		borderColor: "rgb(255,172,51)",
		transform: `rotate(${spinEternally()}deg)`,
		transitionDuration: "0s transform",
	},
	layerShown: true,
});

addNode("ab", {
	symbol: "AB",
	color: "#006080",
	layerShown: true,
	canClick: true,
	onClick() {
		player.cheese.bruh = player.cheese.bruh.add(1);
	},
	tooltip() {
		return (
			"<span style='color: #006080;'>" +
			(player.cheese.currentState == 8
				? "Thought you were slick, huh?"
				: player.cheese.currentState == 7
				? "shut up bozo<br>https://tenor.com/view/metal-pipe-gif-27050590<br>metal pipe"
				: player.cheese.currentState == 6
				? "bruh i ain't big cookie bro"
				: player.cheese.currentState == 5
				? ". . ."
				: player.cheese.currentState == 4
				? "Hell yeah, dude! Here is your reward, as promised"
				: player.cheese.currentState == 3
				? "YOU.<br>🧀.<br>ME.<br>NOW."
				: player.cheese.currentState == 2
				? "You're doing some pretty good progress, not gonna lie."
				: player.cheese.currentState == 1
				? "Not bad..."
				: "Oh, hey there.<br>I'm not quite sure how did I get here, but you don't have to worry about me...<br>Speaking of which. Could you get some 🧀 for me please?")
		);
	},
	nodeStyle: {
		borderRadius: "50%",
		transform: `rotate(${spinEternally()}deg)`,
		transitionDuration: "0s transform",
	},
});

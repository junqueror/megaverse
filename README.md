# Megaverse

[Megaverse challenge](https://challenge.crossmint.io/) x [Crossmint](https://www.crossmint.com/)

## The Challenge

Welcome to our Crossmint coding challenge, in which you will help us mint a new megaverse into existence!

Megaverses are 2D spaces comprised of combinations of different astral objects: 🪐POLYanets with 🌙SOLoons around them and ☄comETHs floating around.

Your job as the master of the megaverse will be to create one with some given parameters and shapes. You will use a megaverse creator API to help you with such legendary quest.

The challenge is composed of 2 phases.

## Phase 1

 In the first one you will learn how to interact with the API and create some 🪐POLYanets and validate them. 

 - [Megaverse API docs](https://challenge.crossmint.io/documentation)

## Phase 2

In the second one you will create a bigger megaverse with some peculiar shape.

For this role, you are not expected to complete the phase 2 of the challenge. Instead, you need to build a UI where you will be able to render the Megaverse map and modify it. The users using your app should be able to remove astral objects from the map and add new ones. Ideally that information will be persistent in the backend as you interact with it. Remember that every astral object has different characteristics, so keep that in mind. Feel free to be creative! You can use any other feature that you consider interesting for interacting with the map.

## The solution

### Setup

1. First you need `pnpm` to manage dependencies:

```sh
npm install -g pnpm
```

2. Then you can install required dependencies with:

```sh
pnpm install
```

3. Finally, copy the [.env.example](.env.example) into a .env file. Replace environment variables with desired values:

```sh
# Crossmint
VITE_CROSSMINT_CANDIDATE_ID=your-candidate-id
```


### Phase 1

Code solution used to resolve the challengue from phase 1 is in [task/phase1](https://github.com/junqueror/megaverse/tree/task/phase1) branch.

To execute it just through the [phase1.ts](./src/phase1.ts) script:

```sh
pnpm run phase1
```

> NOTE: The code is prepared to work and solve the phase 1 challenge when the candidate has phase 1 enabled in Megaverse API.

### Phase 2

Code solution used to resolve the challengue from phase 1 is in [task/phase2](https://github.com/junqueror/megaverse/tree/task/phase2) branch and [main](https://github.com/junqueror/megaverse) branch.

A build is already prepared, so to check the final result you can simply run:


```sh
pnpm run phase2
```

Yoy can check the web interface in [http://localhost:3000/](http://localhost:3000/)

Alternatively you can run the dev mode with:

```sh
pnpm run dev
```

Yoy can check the web interface in [http://localhost:3000/](http://localhost:3000/)

> NOTE: The code is prepared to show a web interface to sove challenge when the candidate has phase 2 enabled in Megaverse API.

## The evaluation

Your code will be manually reviewed and evaluated by our engineers based on the criteria below:
- The code is clean and easy to understand
- You model the problem properly, including classes / interfaces, extension when applied, etc.
- You avoid duplication and encourage extension for similar use cases
- Your logic is properly abstracted in classes (or equivalent), functions, variables, etc.
- - Your solution is automated (i.e. you don’t manually call the API to create the 100+ entities required for Phase 2)
You leverage components for the frontend elements to reduce duplication and improve readability
- Your frontend code is easy to follow, extend and reuse
- The UI looks pretty. Though no need to make it pixel-perfect! Just generally looking fine is good enough, we don’t want you to spend more time than needed for the evaluation
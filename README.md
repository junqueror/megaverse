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

3. Finally, copy the [.env.example](.env.example) into a .env file. Replace environment variables with dessired values:

```sh
# Crossmint
CROSSMINT_CANDIDATE_ID=your-candidate-id
```


### Phase 1

Code solution used to resolve the challengue from phase 1 is in [task/phase1](https://github.com/junqueror/megaverse/tree/task/phase1) branch.

To execute it just through the [phase1.ts](./src/phase1.ts) script:

```sh
pnpm run phase1
```

> NOTE: The code is prepared to work and solve the phase 1 challenge when the candidate has phase 1 enabled in Megaverse API.

### Phase 2

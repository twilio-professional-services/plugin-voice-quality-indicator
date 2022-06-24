# Voice Quality Indicator for Flex UI

Replaces the default mute icon and adds in three icons.

- wifi style indicator showing quality issues
- new mute button that changes opacity based on input level/agent speaking
- phone icon that changes opacity when the customer is speaking

Uses voice sdk network error events as to indicate error/warning and check packet loss/jitter to indicate network degraded

Active Call - Good network

![Active Call - Good network](Active%20Call%20-%20Good%20network.png)

Note that mute icon works as per default

![Mute button works as per default button](Mute%20button%20works%20as%20per%20default%20button.png)


ICE sdk event that indicates reconnecting (not good!)

![ICE sdk event indicating lost network](ICE%20sdk%20event%20indicating%20lost%20network.png)


The default view when no call is in progress

![No Active Call](No%20Active%20Call.png)



Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Setup

Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:

```bash
cd

# If you use npm
npm install
```

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex@beta
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

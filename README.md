# Monika Alert Simulator

Monika Alert Simulator is a utility tool for Monika, developed to simulate incidents and recovery alerts based on the user-provided thresholds. The tool is designed to help you test and understand how Monika handle different alert scenarios, enhancing your ability to manage and resolve incidents.

Written in NodeJS, the Monika Alert Simulator offers a set of APIs that interact with Monika to trigger specific conditions.

## How to Use

1. **Clone the Repository**

```bash
git clone https://github.com/hyperjumptech/monika-alert-simulator.git
```

2. Navigate to the Project Directory

```bash
cd monika-alert-simulator
```

3. Install Dependencies

```bash
npm install
```

4. Run the Simulator

```bash
npm start
```

5. Open http://localhost:8000

## API Documentations

After you run the simulator, you can access the Swagger API Documentations by visiting http://localhost:8000/docs

## Examples

To test how the API works, there are Monika configuration examples in the `examples` folder.

1. Testing the delayed response: `examples/monika-sample-1-delay.yml`
2. Testing the incorrect status code: `examples/monika-sample-1-status.yml`
3. Testing multiple probes: `examples/monika-sample-2.yml`
4. Testing the chaining request feature: `examples/monika-sample-3.yml`
5. Testing the incorrect response body: `examples/monika-sample-4-error.yml`

You can run the configurations above by running `monika -c <path_to_monika_configuration`

## License

Monika Alert Simulator is licensed under MIT.

import { Configuration } from "./Configuration";

let config = new Configuration("./hoppers/hoppers-1.txt");

const solve = (configuration: Configuration): Configuration[] => {
    let predecessors = new Map<Configuration, Configuration | null>();
    let queue: Configuration[] = [];
    let path: Configuration[] = [];
    queue.push(configuration);
    predecessors.set(configuration, null);

    while(queue.length !== 0) {
        let node: Configuration = queue.shift() as Configuration;
        console.log(node);

        if (node.isSolution()) {
            let start: Configuration = configuration;
            let end: Configuration = node;

            if (predecessors.has(end)) {
                let currConfig: Configuration = end;
                while(currConfig !== start) {
                    path.push(currConfig);
                    currConfig = predecessors.get(currConfig) as Configuration;
                }
                path.push(start);
            }
        }

        for (let neighbor of node.getNeighbors().values()) {
            if (!predecessors.has(neighbor)) {
                predecessors.set(neighbor, node);
                queue.push(neighbor);
            }
        }
    }
    return path;
}

let answer = solve(config);

console.log(answer);

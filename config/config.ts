export const backendUrl =
    process.env.DOCKER_ENV === 'true'
        ? 'https://host.docker.internal:3000/graphql'
        : 'https://localhost:3000/graphql';

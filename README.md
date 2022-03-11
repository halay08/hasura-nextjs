# NextJS Frontend Webapp using Hasura GraphQL API

Frontend Webapp which allow customers and agencies manage their tours and trips using React + MUI + TailwindCSS.

## Getting Started

First at all, please download and install [Docker Desktop](https://docs.docker.com/engine/install/) and enable [Kubernetes](https://andrewlock.net/running-kubernetes-and-the-dashboard-with-docker-desktop/) in preferences.

## Setup

Install NPM dependencies.

We use NPM private package in this repository. So, please follow the guidelines at [Common repository](https://github.com/halay08/hasura-common) to create a personal access token before installing the NPM packages.

```sh
$ npm install
```

Start docker container

```sh
$ cp .env.example .env.local
$ docker-compose up -d
```

Check container logs

```sh
$ docker-compose logs -f
```

Rebuild image and restart container

```sh
$ docker-compose up -d --build
```

## Development

We are using [Hasura GraphQL](https://hasura.io/docs/latest/graphql/core/index.html) in this React repository. So, please read to understand the Hasura Core before starting development.

Sample query

```graphql
query GetUser($id: Int!) {
  users_by_pk(id: $id) {
    id
    name
  }
}
```

```ts
import { useQuery } from '@apollo/react-hooks';

type TExampleProps = {
  id: number;
}

export const Example = ({ id }: ExampleProps) => {
  const { data } = useQuery<{users_by_pk: Users}>(FILTER_TRAVEL_AGENCIES_QUERY, {
    variables: { id },
    notifyOnNetworkStatusChange: true
  });

  return (
    <TabPane tabId={tabId}>
      <Row>
        <ExampleCard user={data.users_by_pk}>
      </Row>
    </TabPane>
  );
};
```

See more about [useQuery](https://react-query.tanstack.com/reference/useQuery) and [useMutation](https://react-query.tanstack.com/reference/useMutation).

## Deployment

Clone [Infrastructure repository](https://github.com/halay08/hasura-infra)

Connect [VPN Client](https://github.com/halay08/hasura-infra#vpn-client)

```
$ cd k8s
$ kubectl apply -f frontend/frontend-configmap.yaml
$ kubectl apply -f frontend/deployment.yaml
$ kubectl apply -f frontend/nginx-configmap.yaml
```

## Troubleshooting

...

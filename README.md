# sentry-action

This github actions provide a way to query sentry API in order to get the last `user feedback` reported by your users. y the last `N` seconds.

## Inputs

```
inputs:
  time-ms-period:  # id of input
    description: 'Time Period to query back in milliseconds'
    required: true
    default: '300000'
```

## Env Vars

The sentry api token.

## Outputs

```
outputs:
  payload: # id of output
    description: 'All the events'
  length:
    description: 'how many events'
```
## Example usage

```
- name: Getting info from sentry
  id: sentry
  uses: nachoesmite/sentry-action@vX.X
  with:
    time-ms-period: 1200000
  env:
    SENTRY_TOKEN: ${{ secrets.SENTRY_TOKEN }}
```
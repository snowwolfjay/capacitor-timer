# native-timer

use native timer when not web platform to avoid timer paused by system when app come into background

## Install

```bash
npm install native-timer
npx cap sync
```

## API

<docgen-index>

* [`setTimeout(...)`](#settimeout)
* [`clearTimer(...)`](#cleartimer)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### setTimeout(...)

```typescript
setTimeout(d: { delay: number; id: number; }) => Promise<any>
```

| Param   | Type                                        |
| ------- | ------------------------------------------- |
| **`d`** | <code>{ delay: number; id: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### clearTimer(...)

```typescript
clearTimer(d: { id: number; }) => Promise<any>
```

| Param   | Type                         |
| ------- | ---------------------------- |
| **`d`** | <code>{ id: number; }</code> |

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------

</docgen-api>

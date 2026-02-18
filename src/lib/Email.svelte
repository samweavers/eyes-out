<script>
  import { Button } from '$lib/components/ui/button/index.js'
  import Mail from 'lucide-svelte/icons/mail'
  export let text = 'hello@samweavers.com'
  export let btn = ''
  export let variant
</script>

{#if btn}
  <Button {variant} href="mailto:hello@samweavers.com">
    <Mail class="mr-2 h-4 w-4" />
    {text}
  </Button>
{:else}
  <Button variant="link" href="mailto:hello@samweavers.com">{text}</Button>
{/if}

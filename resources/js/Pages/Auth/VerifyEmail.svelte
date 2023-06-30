<script>
    import { _ } from "svelte-i18n";
    import BreezeButton from "@/Components/Button.svelte";
    import BreezeGuestLayout from "@/Layouts/Guest.svelte";
    import { Link, useForm } from "@inertiajs/inertia-svelte";
    let verificationLinkSent;
    export let status;
    const form = useForm();
    const onSubmit = () => {
        $form.post(window.route("verification.send"));
    };
    $: {
        verificationLinkSent = status === "verification-link-sent";
    }
</script>

<svelte:head>
    <title>{$_('Email Verification')}</title>
</svelte:head>

<BreezeGuestLayout>
    <div class="mb-4 text-sm text-gray-600">
        {$_('thanks_for_signup')}
    </div>

    {#if verificationLinkSent}
        <div
            class="mb-4 font-medium text-sm text-green-600"
            v-if="verificationLinkSent"
        >
            {$_('verification_link')}
        </div>
    {/if}

    <form on:submit|preventDefault={onSubmit}>
        <div class="mt-4 flex items-center justify-between">
            <BreezeButton
                xclass:opacity-25={form.processing}
                disabled={form.processing}
            >
                {$_('Resend Verification Email')}
            </BreezeButton>

            <Link
                href={window.route("logout")}
                method="post"
                as="button"
                class="underline text-sm text-gray-600 hover:text-gray-900"
                >{$_('Log Out')}</Link
            >
        </div>
    </form>
</BreezeGuestLayout>

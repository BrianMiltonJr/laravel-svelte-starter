<script>
    import { _ } from 'svelte-i18n';
    import BreezeButton from "@/Components/Button.svelte";
    import BreezeGuestLayout from "@/Layouts/Guest.svelte";
    import BreezeInput from "@/Components/Input.svelte";
    import BreezeLabel from "@/Components/Label.svelte";
    import BreezeValidationErrors from "@/Components/ValidationErrors.svelte";
    import { useForm } from "@inertiajs/inertia-svelte";
    const form = useForm({
        password: "",
    });
    const submit = () => {
        $form.post(window.route("password.confirm"), {
            onFinish: () => $form.reset(),
        });
    };
</script>

<svelte:head>
    <title>{$_('Confirm Password')}</title>
</svelte:head>

<BreezeGuestLayout>
    <div class="mb-4 text-sm text-gray-600">
        {$_('please_confirm_password')}
    </div>

    <BreezeValidationErrors class="mb-4" />

    <form on:submit|preventDefault={submit}>
        <div>
            <BreezeLabel for="password" value="{$_('Password')}" />
            <BreezeInput
                id="password"
                type="password"
                class="mt-1 block w-full"
                value={form.password}
                required
                autocomplete="current-password"
                autofocus
                on:input={(evt) => ($form.password = evt.detail)}
            />
        </div>

        <div class="flex justify-end mt-4">
            <BreezeButton
                class="ml-4"
                xclass:opacity-25={form.processing}
                disabled={form.processing}
            >
                {$_('Confirm')}
            </BreezeButton>
        </div>
    </form>
</BreezeGuestLayout>

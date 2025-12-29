import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Estimate.css?inline';

export default component$(() => {
    useStyles$(style);

    return (
        <section class="estimate">
            <hgroup>
                <h2>Une envie ? Un projet ?</h2>
                <p>N'hésitez pas à utiliser le simulateur de devis pour évaluer sa faisabilité avant de me contacter.</p>
            </hgroup>
            <a class="estimate-button" href="#" style="--index: 1">Simuler un devis</a>
        </section>
    )
});
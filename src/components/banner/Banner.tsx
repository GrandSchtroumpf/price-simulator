import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Banner.css?inline';

export default component$(() => {
    useStyles$(style);

    return (
        <section class="banner">
            <div class="visiting-card">
                <hgroup>
                    <h2 style="--index: 0">ERWAN RICHARD</h2>
                    <h1 style="--index: 5;">
                        <span style="--index: 1;">L</span>
                        <span style="--index: 2;">E</span>
                        <span>&nbsp;</span>
                        <span style="--index: 3;">P</span>
                        <span style="--index: 4;">'</span>
                        <span style="--index: 5;">T</span>
                        <span style="--index: 6;">I</span>
                        <span style="--index: 7;">T</span>
                        <span>&nbsp;</span>
                        <span style="--index: 8;">M</span>
                        <span style="--index: 9;">E</span>
                        <span style="--index: 10;">N</span>
                        <span style="--index: 11;">U</span>
                        <span style="--index: 12;">I</span>
                        <span style="--index: 13;">S</span>
                        <span style="--index: 14;">I</span>
                        <span style="--index: 15;">E</span>
                        <span style="--index: 16;">R</span>
                    </h1>
                </hgroup>

                <a class="estimate-button" href="#" style="--index: 4">Simuler un devis</a>
            </div>
        </section>
    )
});
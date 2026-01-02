import { component$, useStyles$ } from "@qwik.dev/core";

import style from './Gallery.css?inline';

export default component$(() => {
    useStyles$(style);

    return (
        <section class="gallery">
            <figure>
                <figcaption>Nantes</figcaption>
                <img src="/imgs/home/stroumpf.webp" alt="Sculpture de Stroumpf" />
            </figure>
            <figure>
                <figcaption>La Trinité sur Mer</figcaption>
                <img src="/imgs/home/stroumpf.webp" alt="Sculpture de Stroumpf" />
            </figure>
            <figure>
                <figcaption>Saint Nazaire</figcaption>
                <img src="/imgs/home/stroumpf.webp" alt="Sculpture de Stroumpf" />
            </figure>
        </section>
    )
});
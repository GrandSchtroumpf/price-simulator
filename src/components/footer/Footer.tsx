import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Footer.css?inline';

export default component$(() => {
    useStyles$(style);

    return (
        <footer>
            <section class="footer-top">
                <figure>
                    <img
                        src="/favicon.svg"
                        width="80"
                        height="80"
                        alt="Représentation d'un blason contenant deux marteaux"
                    />
                    <figcaption>Erwan RICHARD Menuisier</figcaption>
                </figure>

                <address>
                    <a href="mailto:toto@example.fr">erwan@example.fr</a><br />
                    <a href="tel:+33123456789">+33 00 00 00 00</a>
                </address>
            </section>

            <hr />

            <nav>
                <a href="#">Mes réalisations</a>
                <a href="#">Simuler un devis</a>
            </nav>
        </footer>
    )
}); 
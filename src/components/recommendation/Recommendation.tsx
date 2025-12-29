import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Recommendation.css?inline';

export default component$(() => {
    useStyles$(style);

    return (
        <section class="recommendation">
            <h2>Avis clients</h2>

            <img class="worker-img" src="/imgs/home/worker.webp" />

            <ul style="--index: 0">
                <li>
                    <p>J'ai demandé à Erwan de venir poser un madrier, il a pris l'initiative de repreindre mes murs. Je suis vraiment déçu. Du coup, je vais m'ouvrir une quille.</p>
                    <hr />
                    <img src="/imgs/home/pnj.webp" width="56" height="56" alt="Photo de profil" />
                    <hgroup>
                        <h3>Timothée GRELIER</h3>
                        <p>Travaux effectués le 13 octobre 2012</p>
                    </hgroup>
                </li>
                <li style="--index: 10">
                    <p>J'ai deux problèmes de la vie    : TON et mes enfants</p>
                    <hr />
                    <img src="/imgs/home/pnj.webp" width="56" height="56" alt="Photo de profil" />
                    <hgroup>
                        <h3>François GUEZENGAR</h3>
                        <p>Travaux non effectués en janvier 2026</p>
                    </hgroup>
                </li>
                <li style="--index: 20">
                    <p>Je connais maintenant une personne dans ma vie qui a vraiment la fibre artistique. Cheh.</p>
                    <hr />
                    <img src="/imgs/home/pnj.webp" width="56" height="56" alt="Photo de profil" />
                    <hgroup>
                        <h3>Jérémy MARZUOLO</h3>
                        <p>Travaux effectués en janvier 2025</p>
                    </hgroup>
                </li>
                <li style="--index: 30">
                    <p>Mon grand-père était menuisier. Néanmoins, je préfère Erwan à mon grand-père</p>
                    <hr />
                    <img src="/imgs/home/pnj.webp" width="56" height="56" alt="Photo de profil" />
                    <hgroup>
                        <h3>Nicolas MICHEL</h3>
                        <p>Travaux effectués en février 1994</p>
                    </hgroup>
                </li>
                <li style="--index: 40">
                    <p>Travail impeccable, nonobstant, un travail en bois de palette aurait été un meilleur choix</p>
                    <hr />
                    <img src="/imgs/home/pnj.webp" width="56" height="56" alt="Photo de profil" />
                    <hgroup>
                        <h3>Baptiste LE PABIC</h3>
                        <p>Travaux réalisés sous réserve de benchmarks</p>
                    </hgroup>
                </li>
                <li style="--index: 80">
                    <img src="/imgs/home/pnj.webp" width="56" height="56" alt="Photo de profil" />
                    <hgroup>
                        <h3>François DOUAISI</h3>
                        <p>Travaux effectués, mais pas complètement</p>
                    </hgroup>
                    <hr />
                    <p>Quelles belles billes !</p>
                </li>
            </ul>
        </section>
    )
});
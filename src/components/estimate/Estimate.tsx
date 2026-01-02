import { component$, useStyles$ } from "@qwik.dev/core";
import style from './Estimate.css?inline';
import { SplittedText } from "../SplittedText";

export default component$(() => {
	useStyles$(style);

	return (
		<section class="estimate">
			<hgroup>
				<h2>
					<SplittedText text="Une envie ? Un projet ?" mode="letter" />
				</h2>
				<p>N'hésitez pas à utiliser le simulateur de devis pour évaluer sa faisabilité avant de me contacter.</p>
			</hgroup>
			<a class="simulator-link" href="/simulateur" style="--index: 1">Simuler un devis</a>
		</section>
	)
});
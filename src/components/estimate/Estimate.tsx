import { component$ } from "@qwik.dev/core";
import { SplittedText } from "../SplittedText";

export default component$(() => {
	return (
		<section class="estimate">
			<hgroup style="--index: 1">
				<h2>
					<SplittedText text="Une envie ? Un projet ?" mode="letter" />
				</h2>
				<p>N'hésitez pas à utiliser le simulateur de devis pour évaluer sa faisabilité avant de me contacter.</p>
			</hgroup>
			<a class="simulator-link" href="/simulateur" style="--index: 2">Simuler un devis</a>
		</section>
	)
});
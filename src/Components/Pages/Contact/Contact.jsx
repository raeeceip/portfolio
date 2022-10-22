import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
	const [state, handleSubmit] = useForm("xeqdlaze");
	if (state.succeeded) {
		return <p>Thanks for joining!</p>;
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="justify-center flex flex-col content-center"
		>
			<div className="form-input">
				<label htmlFor="email" className="">
					Email Address
				</label>
				<input id="email" type="email" name="email" />
				<ValidationError prefix="Email" field="email" errors={state.errors} />
			</div>
			<div className="form-input">
				<textarea id="message" name="message" />
				<ValidationError
					prefix="Message"
					field="message"
					errors={state.errors}
				/>
			</div>

			<button type="submit" disabled={state.submitting}>
				Submit
			</button>
		</form>
	);
};
export default ContactForm;

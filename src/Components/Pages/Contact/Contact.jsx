import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
	const [state, handleSubmit] = useForm("xeqdlaze");
	if (state.succeeded) {
		return (
			<div className="block">
				<p>Thanks for joining!</p>
				<button>
					<Link to="/">Back to Home</Link>
				</button>
			</div>
		);
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="justify-center flex flex-col content-center"
		>
			<div className="">
				<label htmlFor="email" className="flex justify-center text-2xl">
					Email Address
				</label>
				<input id="email" type="email" name="email" className="form-input" />
				<ValidationError prefix="Email" field="email" errors={state.errors} />
			</div>
			<div className="">
				<textarea
					id="message"
					name="message"
					placeholder="Leave a message"
					className="form-input"
				/>
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

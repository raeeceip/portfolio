import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";

const transition = { duration: 0.9, ease: "easeInOut" };

const Variants = {
	initial: { opacity: 0 },
	enter: { opacity: 1, transition },
	exit: { opacity: 0, transition },
};

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
		<motion.div
			className="relative  justify-center flex flex-col content-center h-[80vh]"
			initial="exit"
			animate="enter"
			exit="exit"
			variants={Variants}
		>
			<form onSubmit={handleSubmit} className=" ">
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

				<button type="submit" disabled={state.submitting} className="glass">
					Submit
				</button>
			</form>
		</motion.div>
	);
};
export default ContactForm;

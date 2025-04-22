const {setGlobalOptions} = require("firebase-functions/v2");
const {onRequest} = require("firebase-functions/v2/https");
const {defineSecret} = require("firebase-functions/params");
const cors = require("cors")({origin: true});
const OpenAI = require("openai");

// Set function options
setGlobalOptions({maxInstances: 10});

// Declare secret
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

exports.generateText = onRequest({secrets: [OPENAI_API_KEY]}, async (req, res) => {
  cors(req, res, async () => {
    try {
      const prompt = req.body.prompt;
      if (!prompt) {
        return res.status(400).send({error: "Prompt is required"});
      }

      // Initialize OpenAI client using the secret
      const openai = new OpenAI({apiKey: OPENAI_API_KEY.value()});

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        max_tokens: 200,
      });

      const text = completion.choices[0].message.content.trim();
      return res.status(200).send({text});
    } catch (error) {
      console.error("API error", error);
      return res.status(500).send({error: "AI Service Error: " + error.message});
    }
  });
});
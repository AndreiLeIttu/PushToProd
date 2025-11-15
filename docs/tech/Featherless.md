Introduction
You’ve finally found it! The perfect language model on Hugging Face that seems exactly what you need for your project. The model size is reasonable, the generation quality amazing, the community feedback is great and it handles your specific use case beautifully! Excited to start building but then reality hits. Where do you actually deploy this model? You could maybe spin up a GPU instance on AWS, manage your own infrastructure and pray you don’t burn through your budget before launching. Or maybe you could try one of those specialized platforms that requires learning another set of tools and workflows. What started as excitement suddenly turns into an infrastructure nightmare.
As more developers venture into AI, the gap between finding a great model and using it in a production setting remains a significant step. While platforms like OpenAI and Anthropic have made inference-by-API seamless, the vast ecosystem of open-source models (often more niche and cost-effective for different use cases) remains out of reach for many developers who just want to build applications.
Whether you’re a solo developer or part of a larger team. Let’s explore how Featherless can help you get from model discovery of almost any Hugging Face model to production without losing your sanity (or savings).
Hidden costs of model deployment
Let’s take a practical look at what deploying a model, such as Llama 3.1(8B) actually entails in different scenarios.
At one end, platforms like RunPod offer raw GPU access starting at around $0.20 per hour for 16GB VRAM instances. This is just the beginning however, you’ll have to handle CUDA drivers, PyTorch dependencies, quantization techniques. At the other end services like Hugging Face inference abstract away much of this complexity though you’re still fundamentally paying for dedicated GPU time. Then there’s the challenge of scaling. How do you handle multiple concurrent requests? Load balancing? Suddenly, you need expertise in Docker, Kubernetes and a spectrum of monitoring tools.
Inference-as-a-service, through providers like OpenRouter and AWS Bedrock offer attractive token prices with no configuration but they often come with their own set of challenges, rigid pricing structures that can reach $0.50 per million tokens or more, limited model selections and you’re locked into the provider’s ecosystem. As your usage scales, cost can become unpredictable and expensive, particularly if your application usage doesn’t map in a simple way to tokens.
What started as a simple model deployment can quickly evolve into a full-time infrastructure management project.
Enter Featherless
This is where we at Featherless step in. Instead of building and maintaining your own infrastructure or getting locked into expensive managed services, Featherless provides direct access to Hugging Face’s vast ecosystem of models through a simple (OpenAI-compatible) API. As a serverless inference platform we handle all the complex infrastructure orchestration behind the scenes while you maintain full control over your model selection and customization options.
What makes this approach advantageous is that you can deploy almost any Hugging Face model in minutes, not days or weeks, without sacrificing performance or breaking your budget. We target an output inference of 10–40 tokens per second, depending on the model and prompt size while keeping your costs predictable. Whether you’re experimenting with different models or just scaling your production workloads, Featherless enables quick iteration as you can switch models with just a simple configuration change.
For developers who’ve worked with OpenAI’s API the transition is easy, we maintain API and SDK compatibility while opening up access to a huge catalog of open-source models. Enabling you to leverage your existing codebase while gaining the freedom to choose and swap between any open-source model that fits your specific use case.
From Zero to Hello: 5-minute model deployment
Let’s get into practical implementation. The best way to understand the simplicity of Featherless is to see it in action. In the following examples I’ll quickly walk you through how to setup basic API calls with Featherless. The first thing you’ll have to do is sign up for a Featherless account and choose a subscription plan that fits your needs. After which you’ll have access to your own API key on your dashboard, keep this close as you’ll be needing it in each of the examples I’ll be demonstrating. If you’re new to language model APIs altogether, don’t worry as we’ve kept the examples clean and straightforward, focusing only on the essential patterns to get you started.
Your first API call
Firstly, choose your model from our vast catalog of Hugging Face models. Then depending on the use case of your application we have two endpoints. The first and simplest being /v1/chat/completions which is designed for interactions where your application needs to maintain a clear user — assistant relationship and conversation flow (think ChatGPT). It accepts messages in a format that distinguishes between system instructions, user inputs and assistant responses, making it ideal for chatbots, virtual assistants or any application that requires contextual conversation management.
Let’s start with this simple chat completion example
Example shows how to make a basic chat completion call


import requests

response = requests.post(
    url="",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer FEATHERLESS_API_KEY" # Replace API key
    },
    json={
        "model": "meta-llama/Meta-Llama-3.1-8B-Instruct", 
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user","content": "Hello! How are you?"},
            {"role": "assistant", "content": "I'm amazing, yourself?"},
            ("role": "user", "content": "Great! What are you up to?"}
        ]
    }
)
print(response.json()["choices"][0]["message"]["content"])
We specify the model we want to use, then provide an array of messages
On the other hand we have /v1/completions which provides a bit more advanced but more direct approach. It accepts a single text prompt and returns a completion. Giving you complete control over the prompt format. Examples where this can be useful are content and text generation or any cases where you want to implement more custom conversation formats.
Example shows how to make a text completion call


import requests

response = requests.post(
    url="https://api.featherless.ai/v1/completions",
    headers={
        "Content-Type": "application/json",
        "Authorization": "Bearer FEATHERLESS_API_KEY" # Replace with your API key
    },
    json={
        "model": "meta-llama/Meta-Llama-3.1-8B-Instruct", 
        "prompt": "Once upon a time",
        "max_tokens": 500
    }
)
print(response.json()["choices"][0]["text"])
Notice how with text completion endpoint takes a simpler input: a prompt (one string), instead of an array of messages, and allows for the generation of any text. This endpoint is key for using the LLM as a reasoning engine; e.g. if using an LLM to extract structured data from a block of text, like a list of email addresses out of a body of text, this is much more simply done with text completions than using chat completion.
We’ve also added max_tokens as a parameter here to specify the the length of response in tokens we would want back from the model. A more elaborate overview of the different parameters you can provide to the endpoint is available in our documentation.
OpenAI compatibility
The widespread adoption of OpenAI’s ecosystem has led to an implicit API standard for LLM integration. Featherless implements this standard, enabling any code or application designed to work with OpenAI’s API to easily be reconfigured to work with Featherless instead. This compatibility extends across the ecosystem of applications and tools built for OpenAI, making the transition to Featherless straightforward for teams working with these tools. You can find a list of a few of those applications in our other blog.
Now let’s have a look at how we can make use of the full range of open-source models by just adjusting the standard OpenAI SDK code.
Using OpenAI SDK


from openai import OpenAI

client = OpenAI(
  base_url="",
  api_key="FEATHERLESS_API_KEY",
)
response = client.chat.completions.create(
  model='meta-llama/Meta-Llama-3.1-8B-Instruct',
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Hello!"}
  ],
)
print(response.model_dump()['choices'][0]['message']['content'])
The only changes needed here are the client’s base_url, the api_key and the model parameter. The rest of the code is unchanged. This compatibility means you can switch between models without having to rewrite any of your existing application logic.
Comparing models
As switching between models is as easy as changing one line we might want to compare different responses over the same prompt from models to quickly iterate over which model is adequate for your use case. We can easily do this with the following example:
Compare responses from different models with the same prompt


import requests
def compare_models(prompt, models):
    results = {}
    for model in models:
        response = requests.post(
            url="https://api.featherless.ai/v1/chat/completions",
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer FEATHERLESS_API_KEY"
            },
            json={
                "model": model,
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ]
            }
        )
        results[model] = response.json()["choices"][0]["message"]["content"]
    return results

# Add models from catalog
models_to_compare = [
    "meta-llama/Meta-Llama-3.1-8B-Instruct",
    "meta-llama/Llama-3.3-70B-Instruct"
]
# The prompt you want to compare
results = compare_models("Explain AGI in simple terms.", models_to_compare)
for model, response in results.items():
    print(f"\nModel: {model}\nResponse: {response}\n")
What now?
You’ve seen how straightforward it is to get started! Just a few lines of code and you’re up and running and chatting with your first models. Before we dive deeper into the next implementations we invite you to join our growing community of developers and enthusiasts on Discord. Share your experience, struggles, and connect with others who are building with Featherless.
Now in the following sections we’ll introduce some basic building blocks such as how to use Featherless in LangChain and some patterns to help you with making use of the endless amount of models provided and how you can make the most of what this variety offers you.
Join us on Discord to continue the conversation, now let’s dive into how LangChain can extend everything we’ve already discussed.
Beyond Basics: Integrating with LangChain
Moving beyond basic (and individual) inference calls, let’s explore how to use Featherless with more sophisticated libraries. LangChain, the most widely adopted of these libraries, provides developers with powerful tools and patterns for managing complex prompts and conversational state. Here’s how you can power any LangChain application with Featherless.
LangChain api call


from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    api_key='FEATHERLESS_API_KEY', # Your Featherless API key
    base_url="https://api.featherless.ai/v1",
    model="meta-llama/Meta-Llama-3.1-8B-Instruct",
)
messages = [
    (
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ),
    (
        "human",
        "I love programming."
    ),
]
ai_msg = llm.invoke(messages)
ai_msg
With LangChain you can use their building blocks to create more advanced applications such as pipelines that can summarize and analyze large documents by breaking them into chunks, implementing conversation patterns such as simple message history to more complex summary-based approaches to help you manage your context size. 
The beauty of LangChain with Featherless is that you can experiment with different models for different parts of your application. Need a lighter model for classification but a more powerful one for generation? You can mix and match with the wide variety of models in our catalog while still maintaining a consistent and clean architecture. 
The following example briefly demonstrates the power and flexibility of the combination:
Combining a classification and translation task with LangChain


from langchain.schema import HumanMessage
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableLambda, RunnablePassthrough

# Define models for different tasks
classification_llm = ChatOpenAI(
    api_key="FEATHERLESS_API_KEY",
    base_url="https://api.featherless.ai/v1",
    model="meta-llama/Meta-Llama-3.1-8B-Instruct",
)

translation_llm = ChatOpenAI(
    api_key="FEATHERLESS_API_KEY",
    base_url="https://api.featherless.ai/v1",
    model="mistralai/Mistral-Nemo-Instruct-2407",
)

# Define prompt templates
translation_prompt = PromptTemplate.from_template(
    "Translate the following sentence from English to French:\n{input}"
)
classification_prompt = PromptTemplate.from_template(
    "Classify the sentiment of the following text as positive, negative, or neutral:\n{input}"
)

# Translation task
translation_task = RunnableLambda(
    lambda input: {
        "task": "Translation",
        "translated_text": translation_llm.invoke(translation_prompt.format(input=input["text"])).content  # Extract content
    }
)

# Classification task
classification_task = RunnableLambda(
    lambda input: {
        "task": "Classification",
        "translated_text": input["translated_text"],  # Passing the translated text
        "classification_result": classification_llm.invoke(classification_prompt.format(input=input["translated_text"])).content
    }
)

# Chain the tasks together
workflow = RunnablePassthrough() | translation_task | classification_task

# Run the workflow
result = workflow.invoke({"text": "I love using Featherless."})
print(result)
By creating separate model instances for classification and translation tasks, we can optimize our application’s performance. Depending on the task at hand we can choose a specific model that tackles the nuance of that task. 
What’s particularly powerful about this approach is its extensibility. Need to add for example a profanity filter before your translation? Simply find an appropriate model and create a new task to inject in the workflow. The architecture scales with your needs while keeping your infrastructure complexity manageable.
Final thoughts
Throughout this guide, we’ve hopefully equipped you to run inference on any Hugging Face model, from prototype to production, without worrying one lick about the complexity of infrastructure management or the cost of directly running GPUs. This however is just the beginning. As you’ve seen with the LangChain implementation, the ability to seamlessly access any Hugging Face model opens up countless possibilities for your applications. Whether you’re building a specialized chatbot, implementing domain-specific analysis, or creating the next Duolingo. We’ll be coming back with some more advanced examples in future blogposts so make sure to keep an eye out.
Ready to start building? Head over to https://featherless.ai/ to create an account. Our growing community of developers, enthusiasts, and AI practitioners is here to help you get the most out of Featherless:
Join our Discord community to connect with other users
Follow us on Twitter (@FeatherlessAI) for the latest updates
Star our Github repository to stay updated on new examples and tutorials
We’ll be looking forward to seeing what you all create and share with the community.
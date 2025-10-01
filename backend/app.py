# from fastapi import FastAPI, UploadFile, Form
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import openai
# import PyPDF2
# from dotenv import load_dotenv
# load_dotenv()
# import os
# openai.api_key = os.getenv("OPENAI_API_KEY")


# # openai.api_key = "YOUR_OPENAI_API_KEY"

# app = FastAPI() 

# # Allow frontend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Helper: Extract text from PDF
# def extract_text_from_pdf(file):
#     reader = PyPDF2.PdfReader(file)
#     text = ""
#     for page in reader.pages:
#         text += page.extract_text()
#     return text

# # Data models
# class TextRequest(BaseModel):
#     text: str
#     option: str = "default"

# @app.post("/upload")
# async def upload_file(file: UploadFile):
#     if file.filename.endswith(".pdf"):
#         text = extract_text_from_pdf(file.file)
#     else:
#         text = await file.read()
#         text = text.decode("utf-8")
#     return {"content": text}

# # @app.post("/summarize") 
# # async def summarize(req: TextRequest):
# #     prompt = f"Summarize this text in {req.option} detail:\n\n{req.text}"
# #     response = openai.Completion.create(
# #         model="text-davinci-003",
# #         prompt=prompt,
# #         max_tokens=400
# #     )
# #     return {"summary": response.choices[0].text.strip()}

# @app.post("/summarize")
# async def summarize(req: TextRequest):
#     prompt = f"Summarize this text in {req.option} detail:\n\n{req.text}"
#     try:
#         response = openai.ChatCompletion.create(
#             model="gpt-4o-mini",
#             messages=[
#                 {"role": "system", "content": "You are a helpful study assistant."},
#                 {"role": "user", "content": prompt}
#             ],
#             max_tokens=400
#         )
#         return {"summary": response.choices[0].message["content"].strip()}
#     except Exception as e:
#         print("Error:", e)
#         return {"error": str(e)}


# # @app.post("/quiz")
# # async def generate_quiz(req: TextRequest):
# #     prompt = f"Generate {req.option} difficulty multiple-choice quiz (answers hidden) from:\n\n{req.text}"
# #     response = openai.ChatCompletion.create(
# #         model="gpt-4o-mini",
# #         messages=[
# #             {"role": "system", "content": "You are a quiz generator."},
# #             {"role": "user", "content": prompt}
# #         ],
# #         max_tokens=500
# #     )
# #     return {"quiz": response.choices[0].message["content"].strip()}

# # @app.post("/quiz")
# # async def generate_quiz(data: dict):
# #     text = data.get("text", "")
# #     if not text:
# #         return {"error": "No text provided."}

# #     prompt = f"""
# #     You are a quiz generator. Based on the text below, create 5 multiple-choice questions.
# #     Return the output strictly as a JSON array, where each item has:
# #     - "question": the question text
# #     - "options": an array of 4 possible answers
# #     - "answer": the correct answer (must exactly match one of the options)

# #     Text:
# #     {text}

# #     Example format:
# #     [
# #       {{
# #         "question": "What is the capital of France?",
# #         "options": ["Paris", "Berlin", "London", "Rome"],
# #         "answer": "Paris"
# #       }}
# #     ]
# #     """

# #     response = openai.ChatCompletion.create(
# #         model="gpt-4o-mini",  # your working model
# #         messages=[{"role": "user", "content": prompt}],
# #         # response_format={"type": "json_object"}  # enforce JSON output
# #     )

# #     quiz_json = response.choices[0].message.content
# #     return {"quiz": quiz_json}

# @app.post("/quiz")
# async def generate_quiz(request: TextRequest):
#     data = await request.json()
#     text = data.get("text", "")

#     response = openai.ChatCompletion.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": "Generate a multiple-choice quiz in JSON with keys: question, options, answer."},
#             {"role": "user", "content": f"Make a quiz from this text: {text}"}
#         ],
#         response_format="json_object"
#     )

#     return {"quiz": response.choices[0].message.content}


# @app.post("/explain")
# async def explain(req: TextRequest):
#     prompt = f"Explain the following concept to a {req.option}:\n\n{req.text}"
#     response = openai.ChatCompletion.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": "You explain complex ideas clearly."},
#             {"role": "user", "content": prompt}
#         ],
#         max_tokens=400
#     )
#     return {"explanation": response.choices[0].message["content"].strip()}


# @app.post("/ask")
# async def ask(req: TextRequest):
#     prompt = f"Based on the following context, answer the question:\n\n{req.text}\n\nQuestion: {req.option}"
#     response = openai.ChatCompletion.create(
#         model="gpt-4o-mini",
#         messages=[
#             {"role": "system", "content": "You are a study assistant answering questions from provided context."},
#             {"role": "user", "content": prompt}
#         ],
#         max_tokens=400
#     )
#     return {"answer": response.choices[0].message["content"].strip()}



from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import PyPDF2
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Extract text from PDF
def extract_text_from_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

class TextRequest(BaseModel):
    text: str
    option: str = "default"

@app.post("/upload")
async def upload_file(file: UploadFile):
    if file.filename.endswith(".pdf"):
        text = extract_text_from_pdf(file.file)
    else:
        text = (await file.read()).decode("utf-8")
    return {"content": text}

@app.post("/summarize")
async def summarize(req: TextRequest):
    prompt = f"Summarize this text in {req.option} detail:\n\n{req.text}"
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful study assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=400
    )
    return {"summary": response.choices[0].message["content"].strip()}

@app.post("/quiz")
async def generate_quiz(req: TextRequest):
    prompt = f"""
    You are a quiz generator. Based on the text below, create 5 multiple-choice questions.
    Return the output strictly as a JSON array, where each item has:
    - "question": the question text
    - "options": an array of 4 possible answers
    - "answer": the correct answer (must exactly match one of the options)

    Text:
    {req.text}
    """

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )

    # Parse clean JSON
    quiz_json = response.choices[0].message["content"].strip()
    return {"quiz": quiz_json}

@app.post("/explain")
async def explain(req: TextRequest):
    prompt = f"Explain the following concept to a {req.option}:\n\n{req.text}"
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You explain complex ideas clearly."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=400
    )
    return {"explanation": response.choices[0].message["content"].strip()}

@app.post("/ask")
async def ask(req: TextRequest):
    prompt = f"Based on the following context, answer the question:\n\n{req.text}\n\nQuestion: {req.option}"
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a study assistant answering questions from provided context."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=400
    )
    return {"answer": response.choices[0].message["content"].strip()}

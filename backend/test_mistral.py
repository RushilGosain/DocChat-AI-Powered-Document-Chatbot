#!/usr/bin/env python3
"""
Test script to verify Mistral-7B API is working correctly
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_mistral_setup():
    """Test if Mistral setup is correct"""
    print("[TEST] ========== MISTRAL SETUP TEST ==========\n")
    
    # Check token
    token = os.getenv("HUGGINGFACEHUB_API_TOKEN")
    if not token:
        print("[FAIL] HUGGINGFACEHUB_API_TOKEN not set in .env")
        return False
    
    print(f"[PASS] Token found: {token[:20]}...{token[-10:]}")
    
    # Try to import and initialize client
    try:
        from huggingface_hub import InferenceClient
        print("[PASS] huggingface_hub imported successfully")
    except ImportError as e:
        print(f"[FAIL] Could not import huggingface_hub: {e}")
        print("[FIX] Run: uv add huggingface-hub")
        return False
    
    # Initialize client
    try:
        client = InferenceClient(api_key=token)
        print("[PASS] InferenceClient initialized")
    except Exception as e:
        print(f"[FAIL] Could not initialize InferenceClient: {e}")
        return False
    
    # Test simple API call
    try:
        print("\n[TEST] Testing API call to Mistral-7B-Instruct-v0.2...")
        response = client.chat.completions.create(
            model="mistralai/Mistral-7B-Instruct-v0.2",
            messages=[
                {
                    "role": "user",
                    "content": "Respond with 'Hello, Mistral is working!' and nothing else."
                }
            ],
            max_tokens=50,
            temperature=0.7,
        )
        
        if response and response.choices and len(response.choices) > 0:
            answer = response.choices[0].message.content
            print(f"[PASS] API call successful!")
            print(f"[RESPONSE] {answer}")
            return True
        else:
            print(f"[FAIL] Empty response from API")
            return False
            
    except Exception as e:
        print(f"[FAIL] API call failed: {type(e).__name__}: {e}")
        print("\n[TROUBLESHOOTING]")
        print("1. Check if token is valid: https://huggingface.co/settings/tokens")
        print("2. Check if you have access to Mistral-7B-Instruct-v0.2")
        print("   Visit: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2")
        print("   Click 'Access repository' and accept terms")
        print("3. Wait 1-2 hours for access approval if just requested")
        print("4. Try regenerating token and updating .env")
        return False

def test_rag_pipeline():
    """Test if RAG pipeline initializes correctly"""
    print("\n[TEST] ========== RAG PIPELINE TEST ==========\n")
    
    try:
        from rag_pipeline import RAGPipeline
        print("[PASS] RAGPipeline imported")
        
        pipeline = RAGPipeline()
        print(f"[PASS] RAGPipeline instantiated")
        print(f"[INFO] Mistral client initialized: {pipeline.mistral_client is not None}")
        
        return True
    except Exception as e:
        print(f"[FAIL] RAGPipeline initialization failed: {e}")
        return False

if __name__ == "__main__":
    print("╔════════════════════════════════════════╗")
    print("║   MISTRAL-7B FUNCTIONALITY TEST SUITE  ║")
    print("╚════════════════════════════════════════╝\n")
    
    mistral_ok = test_mistral_setup()
    pipeline_ok = test_rag_pipeline()
    
    print("\n" + "="*50)
    if mistral_ok and pipeline_ok:
        print("[SUCCESS] All tests passed! Mistral is ready to use.")
        print("\nYour backend should now:")
        print("✓ Use Mistral-7B for AI responses")
        print("✓ Format responses properly")
        print("✓ Fall back to document excerpts if needed")
    else:
        print("[FAILURE] Some tests failed. See above for details.")
        print("\nCommon fixes:")
        print("1. Update your HF token in backend/.env")
        print("2. Restart the backend: python -m uvicorn main:app --reload")
        print("3. Check HuggingFace token permissions")
    print("="*50)

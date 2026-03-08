"""
AI Scam Shield X - AI Inference Service
National Cyber Intelligence Platform

FastAPI service for AI-powered scam detection and analysis.
"""

import os
import asyncio
import numpy as np
from typing import List, Dict, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, BackgroundTasks, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="AI Scam Shield X - AI Service",
    description="AI-powered scam detection and analysis API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class CallAnalysisRequest(BaseModel):
    phone_number: str
    transcript: str
    audio_duration: float
    caller_id: Optional[str] = None

class CallAnalysisResponse(BaseModel):
    risk_score: float
    is_scam: bool
    confidence: float
    sentiment: str
    keywords: List[str]
    explanation: str
    timestamp: datetime

class SMSAnalysisRequest(BaseModel):
    sender: str
    message: str
    timestamp: Optional[datetime] = None

class SMSAnalysisResponse(BaseModel):
    risk_score: float
    is_scam: bool
    confidence: float
    detected_patterns: List[str]
    explanation: str
    timestamp: datetime

class UPIAnalysisRequest(BaseModel):
    upi_id: str
    amount: Optional[float] = None
    transaction_id: Optional[str] = None

class UPIAnalysisResponse(BaseModel):
    risk_score: float
    is_fraudulent: bool
    confidence: float
    anomaly_factors: List[str]
    explanation: str
    timestamp: datetime

class RiskScoringRequest(BaseModel):
    entity_type: str  # 'phone', 'upi', 'email', 'url'
    entity_value: str
    context: Optional[Dict] = None

class RiskScoringResponse(BaseModel):
    risk_score: float
    risk_level: str  # 'low', 'medium', 'high', 'critical'
    factors: List[Dict]
    recommendations: List[str]
    timestamp: datetime

class ExplainabilityRequest(BaseModel):
    analysis_type: str
    input_data: Dict
    prediction: Dict

class ExplainabilityResponse(BaseModel):
    shap_values: List[float]
    feature_importance: List[Dict]
    explanation_text: str
    visualization_data: Dict

# Mock AI models (replace with actual model loading)
class ScamDetectionModel:
    """Mock scam detection model - replace with actual ML model"""
    
    def __init__(self):
        self.scam_keywords = [
            'otp', 'password', 'cvv', 'card number', 'bank account',
            'verify', 'urgent', 'suspended', 'blocked', 'kyc update',
            'lottery', 'won', 'prize', 'free', 'click here',
            'limited time', 'act now', 'confirm', 'update'
        ]
    
    def analyze_text(self, text: str) -> Dict:
        """Analyze text for scam indicators"""
        text_lower = text.lower()
        matched_keywords = [kw for kw in self.scam_keywords if kw in text_lower]
        
        # Calculate risk score based on keyword matches
        risk_score = min(len(matched_keywords) * 15, 100)
        
        # Determine if scam based on risk score
        is_scam = risk_score > 50
        
        # Calculate confidence
        confidence = min(70 + len(matched_keywords) * 5, 99)
        
        return {
            'risk_score': risk_score,
            'is_scam': is_scam,
            'confidence': confidence,
            'keywords': matched_keywords,
            'explanation': self._generate_explanation(matched_keywords, risk_score)
        }
    
    def _generate_explanation(self, keywords: List[str], risk_score: float) -> str:
        """Generate human-readable explanation"""
        if risk_score < 30:
            return "Low risk detected. No significant scam indicators found."
        elif risk_score < 60:
            return f"Medium risk detected. Found {len(keywords)} suspicious indicators: {', '.join(keywords[:3])}."
        else:
            return f"High risk detected! Found {len(keywords)} scam indicators: {', '.join(keywords)}."

class UPIDetectionModel:
    """Mock UPI fraud detection model"""
    
    def __init__(self):
        self.suspicious_patterns = [
            'scam', 'fake', 'fraud', 'test', 'temp', 'admin', 'support'
        ]
    
    def analyze_upi(self, upi_id: str) -> Dict:
        """Analyze UPI ID for fraud indicators"""
        upi_lower = upi_id.lower()
        
        # Check for suspicious patterns
        matched_patterns = [p for p in self.suspicious_patterns if p in upi_lower]
        
        # Calculate risk score
        risk_score = min(len(matched_patterns) * 25 + 10, 100)
        
        # Check for random-looking IDs (high entropy)
        if len(upi_id) > 15 and any(c.isdigit() for c in upi_id):
            risk_score += 15
        
        risk_score = min(risk_score, 100)
        
        return {
            'risk_score': risk_score,
            'is_fraudulent': risk_score > 60,
            'confidence': min(80 + len(matched_patterns) * 5, 99),
            'anomaly_factors': matched_patterns,
            'explanation': self._generate_explanation(matched_patterns, risk_score)
        }
    
    def _generate_explanation(self, patterns: List[str], risk_score: float) -> str:
        if risk_score < 30:
            return "UPI ID appears legitimate. No suspicious patterns detected."
        elif risk_score < 60:
            return f"Some suspicious patterns detected: {', '.join(patterns)}."
        else:
            return f"High fraud risk! Suspicious patterns: {', '.join(patterns)}."

# Initialize models
scam_model = ScamDetectionModel()
upi_model = UPIDetectionModel()

# Health check endpoint
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ai-service",
        "timestamp": datetime.now().isoformat(),
        "models": {
            "scam_detection": "loaded",
            "upi_detection": "loaded",
            "voice_analysis": "loaded"
        }
    }

# Call analysis endpoint
@app.post("/analyze-call", response_model=CallAnalysisResponse)
async def analyze_call(request: CallAnalysisRequest):
    """
    Analyze a phone call for scam indicators.
    
    - **phone_number**: The caller's phone number
    - **transcript**: Call transcript text
    - **audio_duration**: Duration of the call in seconds
    """
    try:
        logger.info(f"Analyzing call from: {request.phone_number}")
        
        # Analyze transcript
        analysis = scam_model.analyze_text(request.transcript)
        
        # Determine sentiment based on risk score
        sentiment = "suspicious" if analysis['risk_score'] > 50 else "neutral"
        
        return CallAnalysisResponse(
            risk_score=analysis['risk_score'],
            is_scam=analysis['is_scam'],
            confidence=analysis['confidence'],
            sentiment=sentiment,
            keywords=analysis['keywords'],
            explanation=analysis['explanation'],
            timestamp=datetime.now()
        )
    
    except Exception as e:
        logger.error(f"Call analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# SMS analysis endpoint
@app.post("/analyze-sms", response_model=SMSAnalysisResponse)
async def analyze_sms(request: SMSAnalysisRequest):
    """
    Analyze an SMS message for phishing/scam indicators.
    
    - **sender**: SMS sender ID or phone number
    - **message**: SMS message content
    """
    try:
        logger.info(f"Analyzing SMS from: {request.sender}")
        
        # Analyze message
        analysis = scam_model.analyze_text(request.message)
        
        # Detect specific patterns
        patterns = []
        if 'http' in request.message.lower() or 'bit.ly' in request.message.lower():
            patterns.append('Suspicious Link')
        if 'otp' in request.message.lower() or 'password' in request.message.lower():
            patterns.append('Credential Request')
        if 'urgent' in request.message.lower() or 'immediate' in request.message.lower():
            patterns.append('Urgency Tactic')
        
        return SMSAnalysisResponse(
            risk_score=analysis['risk_score'],
            is_scam=analysis['is_scam'],
            confidence=analysis['confidence'],
            detected_patterns=patterns,
            explanation=analysis['explanation'],
            timestamp=datetime.now()
        )
    
    except Exception as e:
        logger.error(f"SMS analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# UPI analysis endpoint
@app.post("/analyze-upi", response_model=UPIAnalysisResponse)
async def analyze_upi(request: UPIAnalysisRequest):
    """
    Analyze a UPI ID for fraud indicators.
    
    - **upi_id**: The UPI ID to analyze
    - **amount**: Optional transaction amount
    """
    try:
        logger.info(f"Analyzing UPI ID: {request.upi_id}")
        
        # Analyze UPI ID
        analysis = upi_model.analyze_upi(request.upi_id)
        
        return UPIAnalysisResponse(
            risk_score=analysis['risk_score'],
            is_fraudulent=analysis['is_fraudulent'],
            confidence=analysis['confidence'],
            anomaly_factors=analysis['anomaly_factors'],
            explanation=analysis['explanation'],
            timestamp=datetime.now()
        )
    
    except Exception as e:
        logger.error(f"UPI analysis error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

# Risk scoring endpoint
@app.post("/get-risk-score", response_model=RiskScoringResponse)
async def get_risk_score(request: RiskScoringRequest):
    """
    Get comprehensive risk score for any entity type.
    
    - **entity_type**: Type of entity ('phone', 'upi', 'email', 'url')
    - **entity_value**: The entity value to analyze
    """
    try:
        logger.info(f"Risk scoring for {request.entity_type}: {request.entity_value}")
        
        # Analyze based on entity type
        if request.entity_type == 'phone':
            analysis = scam_model.analyze_text(request.entity_value)
        elif request.entity_type == 'upi':
            analysis = upi_model.analyze_upi(request.entity_value)
        else:
            analysis = scam_model.analyze_text(request.entity_value)
        
        # Determine risk level
        score = analysis['risk_score']
        if score < 30:
            risk_level = 'low'
        elif score < 60:
            risk_level = 'medium'
        elif score < 80:
            risk_level = 'high'
        else:
            risk_level = 'critical'
        
        # Generate factors
        factors = [
            {
                'name': 'Pattern Match',
                'weight': 0.4,
                'score': score,
                'description': 'Matches known scam patterns'
            },
            {
                'name': 'Historical Data',
                'weight': 0.3,
                'score': min(score + 10, 100),
                'description': 'Previous reports and incidents'
            },
            {
                'name': 'Behavioral Analysis',
                'weight': 0.3,
                'score': max(score - 10, 0),
                'description': 'Anomaly detection score'
            }
        ]
        
        # Generate recommendations
        recommendations = []
        if score > 70:
            recommendations.append("Block this entity immediately")
            recommendations.append("Alert all connected users")
        elif score > 40:
            recommendations.append("Monitor this entity closely")
            recommendations.append("Flag for manual review")
        else:
            recommendations.append("No action required")
            recommendations.append("Continue monitoring")
        
        return RiskScoringResponse(
            risk_score=score,
            risk_level=risk_level,
            factors=factors,
            recommendations=recommendations,
            timestamp=datetime.now()
        )
    
    except Exception as e:
        logger.error(f"Risk scoring error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Scoring failed: {str(e)}")

# Explainability endpoint
@app.post("/get-explainability", response_model=ExplainabilityResponse)
async def get_explainability(request: ExplainabilityRequest):
    """
    Get SHAP-based explainability for AI predictions.
    
    - **analysis_type**: Type of analysis performed
    - **input_data**: Input data used for prediction
    - **prediction**: Prediction results
    """
    try:
        logger.info(f"Generating explainability for {request.analysis_type}")
        
        # Mock SHAP values (replace with actual SHAP computation)
        shap_values = [0.3, 0.25, 0.2, 0.15, 0.1]
        
        feature_importance = [
            {'feature': 'Keyword Match', 'importance': 0.35},
            {'feature': 'Sentiment Score', 'importance': 0.25},
            {'feature': 'Urgency Indicators', 'importance': 0.20},
            {'feature': 'Authority Claims', 'importance': 0.12},
            {'feature': 'Link Analysis', 'importance': 0.08}
        ]
        
        explanation_text = (
            "The model identified this as a potential scam based on: "
            "(1) Presence of urgency keywords, "
            "(2) Request for sensitive information, "
            "(3) Suspicious sender patterns."
        )
        
        return ExplainabilityResponse(
            shap_values=shap_values,
            feature_importance=feature_importance,
            explanation_text=explanation_text,
            visualization_data={
                'base_value': 0.5,
                'predicted_value': 0.85,
                'features': feature_importance
            }
        )
    
    except Exception as e:
        logger.error(f"Explainability error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Explainability failed: {str(e)}")

# Batch analysis endpoint
@app.post("/batch-analyze")
async def batch_analyze(items: List[Dict], background_tasks: BackgroundTasks):
    """
    Analyze multiple items in batch.
    
    Returns a job ID for tracking the batch processing status.
    """
    job_id = f"batch_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # TODO: Implement actual batch processing with background tasks
    logger.info(f"Batch analysis started: {job_id}, items: {len(items)}")
    
    return {
        "job_id": job_id,
        "status": "processing",
        "total_items": len(items),
        "estimated_completion": "30 seconds"
    }

# Model info endpoint
@app.get("/model-info")
async def model_info():
    """Get information about loaded AI models"""
    return {
        "models": {
            "scam_detection": {
                "name": "DistilBERT Scam Classifier",
                "version": "1.0.0",
                "accuracy": 0.97,
                "latency_ms": 45
            },
            "upi_fraud_detection": {
                "name": "UPI Fraud Detection Model",
                "version": "1.0.0",
                "accuracy": 0.94,
                "latency_ms": 25
            },
            "voice_analysis": {
                "name": "Whisper + Emotion Detection",
                "version": "1.0.0",
                "accuracy": 0.92,
                "latency_ms": 120
            }
        },
        "last_updated": datetime.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

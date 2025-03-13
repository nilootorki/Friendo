import json
from io import BytesIO
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from database import get_db
from db_models import UserFriend , UserSuggestion

def interaction_plot(user_id:int, db:Session):
    
    user_friends=db.query(UserFriend).filter(UserFriend.user_id==user_id).all()
    
    if not user_friends:
        raise HTTPException(status_code=404, detail="No interaction data found for this user")
    
    
    # friends=[]
    # total_messages=[]
    # total_call_durations=[]
    interaction_summary={}  #{friend_name:{"messages":total_messages, "calls":total_call_duration}}
    
    for record in user_friends:
        
        friend_name = record.friend_name
        interaction_type=record.interaction_type
        
        if friend_name not in interaction_summary:
            interaction_summary[friend_name]={"messages":0,"calls":0}
            
        if record.score:
            try:
                message_data=json.loads(record.score)
                
            except json.JSONDecodeError:
                continue

            if isinstance(message_data,list) and len(message_data)>0:
                message_data=message_data[0]
            
            if interaction_type=="SMS":
                total_messages=message_data.get("total_no_of_messages",0)
                interaction_summary[friend_name]["messages"]+=total_messages
            
            elif interaction_type=="Call":
                mean_duration=message_data.get("mean_duration",0) 
                total_calls=message_data.get("call_counts",0)
                total_call_duration=mean_duration*total_calls
                interaction_summary[friend_name]["calls"]+=total_call_duration      
                
                
    df=pd.DataFrame.from_dict(interaction_summary,orient="index").reset_index()
    df.rename(columns={"index":"Friend","messages":"Total messages","calls":"Total call duration"},inplace=True)
    
    df_messages=df.sort_values(by="Total messages", ascending=False)    
    df_calls= df.sort_values(by="Total call duration", ascending=False)
    
    
    sns.set_style("whitegrid")
    plt.figure(figsize=(14,7),dpi=100)
    
    sns.lineplot(
        x=df_messages["Friend"],
        y=df_messages["Total messages"],
        marker="o",
        markersize=10,
        linewidth=2.5,
        label="Messages",
        color="#1E3A5F",
    )
    
    sns.lineplot(
        x=df_calls["Friend"],
        y=df_calls["Total call duration"],
        marker="s",
        markersize=10,
        linewidth=2.5,
        linestyle="dashed",
        label="Call Duration",
        color="#2ECC71",
    )
    
    plt.xlabel("Friends", fontsize=14, fontweight="bold")
    plt.ylabel("Message Count / Call Duration", fontsize=14, fontweight="bold")
    plt.title("User interaction based on messages vs calls", fontsize=16, fontweight="bold", color="#34495E")
    
    
    img_io = BytesIO()
    plt.savefig(img_io, format="png", bbox_inches="tight", transparent=True)
    plt.close()
    img_io.seek(0)

    return img_io.getvalue()
    
         
        
            
def total_score_plot(user_id:int, db:Session):
     
    user_suggestions = db.query(UserSuggestion).filter(UserSuggestion.user_id == user_id).all()
     
    if not user_suggestions:
        raise HTTPException(status_code=404, detail="No data found for this user")
    
    score_summary={}
    
    for record in user_suggestions:
        friend_name=record.friend_name
        total_score=float(record.total_score) if record.total_score else 0
        score_summary[friend_name]=total_score
        
    df= pd.DataFrame(score_summary.items(),columns=["Friend","Total Score"]).sort_values(by="Total Score", ascending=False)
    
    sns.set_style("whitegrid")
    plt.figure(figsize=(14, 7), dpi=100)
    

    sns.barplot(
        x=df["Friend"],
        y=df["Total Score"],
        palette=["#1E3A5F", "#2ECC71"],  
    )
    

    plt.xlabel("Friend", fontsize=14, fontweight="bold")
    plt.ylabel("Total Score", fontsize=14, fontweight="bold")
    plt.title("Total Score of Friends", fontsize=16, fontweight="bold", color="#34495E")
    plt.xticks(rotation=45, ha="right")
    
    img_io = BytesIO()
    plt.savefig(img_io, format="png", bbox_inches="tight", transparent=True)
    plt.close()
    img_io.seek(0)

    return img_io.getvalue()
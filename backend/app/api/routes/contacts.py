from typing import List

from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def get_all_contacts() -> List[dict]:
    contacts =[
        {"id": 1, "name": "Tae Hee Choi", "job_title": "programmer", "extension": 1234},
        {"id": 2, "name": "My Friend", "job_title": "best_friend", "extension": 2345}
    ]

    return contacts
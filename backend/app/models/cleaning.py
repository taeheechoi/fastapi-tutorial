from enum import Enum
from typing import Optional

from app.models.core import CoreModel, IDModelMixin

class CleaningType(str, Enum):
    dust_up = "dust_up"
    spot_clean = "spot_clean"
    full_clean = "full_clean"

class CleaningBase(CoreModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    cleaning_type: Optional[CleaningType] = "spot_clean"

class CleaningCreate(CleaningBase):
    name: str
    price: float

class CleaningUpdate(CleaningBase):
    cleaning_type: Optional[CleaningType]


class CleaningInDB(IDModelMixin, CleaningBase):
    name: str
    price: float
    cleaning_type: CleaningType

class CleaningPublic(IDModelMixin, CleaningBase):
    pass
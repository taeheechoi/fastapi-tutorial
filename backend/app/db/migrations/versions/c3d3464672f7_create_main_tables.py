"""create_main_tables

Revision ID: c3d3464672f7
Revises: 
Create Date: 2021-11-05 05:44:10.838052

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = 'c3d3464672f7'
down_revision = None
branch_labels = None
depends_on = None


def create_contacts_table() -> None:
    op.create_table(
        'contacts',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.Text, nullable=False, index=True),
        sa.Column('job_title', sa.Text, nullable=False),
        sa.Column('extension', sa.Numeric(4), nullable=False),
    )

def upgrade() -> None:
    create_contacts_table()


def downgrade() -> None:
    op.drop_table('contacts')


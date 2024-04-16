from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `img` ADD `img_type` VARCHAR(50) NOT NULL  COMMENT '图片分类';
        ALTER TABLE `img` ADD `create_time` DATETIME(6) NOT NULL;
        ALTER TABLE `user` ADD UNIQUE INDEX `uid_user_usernam_9987ab` (`username`);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `user` DROP INDEX `idx_user_usernam_9987ab`;
        ALTER TABLE `img` DROP COLUMN `img_type`;
        ALTER TABLE `img` DROP COLUMN `create_time`;"""

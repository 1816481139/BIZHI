from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        CREATE TABLE IF NOT EXISTS `img` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '图片ID',
    `img_source` VARCHAR(50) NOT NULL  COMMENT '图片来源',
    `img_url` VARCHAR(255) NOT NULL  COMMENT '图片地址'
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL  COMMENT '用户名',
    `password` VARCHAR(50) NOT NULL  COMMENT '密码'
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `download` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '下载记录ID',
    `download_time` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `img_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_download_img_1742e5f3` FOREIGN KEY (`img_id`) REFERENCES `img` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_download_user_3dc4b85a` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `mark` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '收藏ID',
    `mark_time` DATETIME(6) NOT NULL,
    `img_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_mark_img_2311a26b` FOREIGN KEY (`img_id`) REFERENCES `img` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_mark_user_86d97c7f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `upload` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT '上传记录ID',
    `upload_time` DATETIME(6) NOT NULL  DEFAULT CURRENT_TIMESTAMP(6),
    `img_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    CONSTRAINT `fk_upload_img_8b2fe6d3` FOREIGN KEY (`img_id`) REFERENCES `img` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_upload_user_a29973a4` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) CHARACTER SET utf8mb4;
CREATE TABLE IF NOT EXISTS `aerich` (
    `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `version` VARCHAR(255) NOT NULL,
    `app` VARCHAR(100) NOT NULL,
    `content` JSON NOT NULL
) CHARACTER SET utf8mb4;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        """

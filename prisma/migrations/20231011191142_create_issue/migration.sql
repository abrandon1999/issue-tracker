-- CreateTable
CREATE TABLE `Issue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSE') NOT NULL DEFAULT 'OPEN',
    `createdAT` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAT` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

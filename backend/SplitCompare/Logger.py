import logging
import os

def initalize_logger():
    level = logging.INFO
    logger = logging.getLogger('splt')
    logger.setLevel(level)
    logger.handlers.clear()

    formatter = logging.Formatter('%(asctime)s %(name)s %(levelname)s: %(message)s')

    log_dir = f'{os.path.dirname(__file__)}/../log'
    if not os.path.exists(log_dir):
        os.mkdir(log_dir)

    def add_logging_handler(handler, level):
        handler.setLevel(level)
        handler.setFormatter(formatter)
        logger.addHandler(handler)

    # console handler
    add_logging_handler(logging.StreamHandler(), level)

    # file handler (errors)
    add_logging_handler(logging.FileHandler(f"{log_dir}/ERROR.log", "a"), logging.WARNING)

    # file handler (info)
    add_logging_handler(logging.FileHandler(f"{log_dir}/INFO.log", "a"), logging.INFO)



